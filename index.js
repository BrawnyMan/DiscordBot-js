const { prefix, token } = require("./config.json");
const { Collection } = require("discord.js");
const MakeClient = require("./util/Client");
const { curr_time } = require("./util/curr_time.js");
const { readdirSync } = require("fs");
let clr = require("./other/clear.js");
let rld = require("./other/reload.js");
const client = new MakeClient();

// Gets all command names
const commandFile = readdirSync("./commands").filter((file) =>
  file.endsWith(".js")
);
// Sets all commands
for (const file of commandFile) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// What will bot do when it starts
client.on("ready", () => {
  console.log("Ready to work hard!");
  client.user.setActivity("YT", { type: "WATCHING" });
});

// What will bot do when it receives message
client.on("message", (message) => {
  // Check if the message starts with correct characters / prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  //--------------------------------------------------------------------
  // Commands only id_user can run
  if (message.author.id == "<your_id>") {
    // Command that kill / shutdowns the bot
    if (message.content == `${prefix}kill`)
      process.kill(process.pid, "SIGTERM");
    // Clear command
    else if (message.content.startsWith(`${prefix}clear`)) clr(message);
    // Reaload command
    else if (message.content.startsWith(`${prefix}reload`)) rld(message);
  }
  //--------------------------------------------------------------------
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  // Find command
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;
  // Check proper use of command
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    if (command.usage)
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    return message.channel.send(reply);
  }
  // Checks or makes a cooldown for all commands
  if (!client.cooldowns.has(command.name))
    client.cooldowns.set(command.name, new Collection());
  if (message.channel.type !== "text")
    return message.reply("I can't execute that command inside DMs!");
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  try {
    // Execute command
    command.execute(message);
  } catch (error) {
    message.client.users.cache
      .get("<your_id>")
      .send(`[${curr_time()}] ${message.author} (${message.content}) ${error}`);
  }
});

// Login bot
client.login(token);
