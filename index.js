// Everything the bot requires
const { prefix, token } = require("./config.json");
const { Collection } = require("discord.js");
const MakeClient = require("./util/Client");
const { readdirSync } = require("fs");

// Special command
let clr = require("./other/clear.js");

// Create bot/client
const client = new MakeClient();

// Find all files in ./commands that ends with .js
const commandFile = readdirSync("./commands").filter((file) =>
  file.endsWith(".js")
);

// Sets all commands from ./commands folder
for (const file of commandFile) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// When bot/client is ready
client.on("ready", () => {
  console.log("Ready to work hard!");
  client.user.setActivity("YT", { type: "WATCHING" });
});

// When bot/client recieves the message
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  // Only you can execute this command
  if (message.author.id == "<your_ID>") {
    if (message.content == `${prefix}kill`)
      process.kill(process.pid, "SIGTERM");
    // Shuts down the bot
    else if (message.content.startsWith(`${prefix}clear`)) clr(message); // Clear messages for you
  }
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase(); // All commands are turned to lowercase
  // Find command or searche it under it's aliases
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;
  if (command.args && !args.length) {
    // If there is no argument but it should be
    let reply = `You didn't provide any arguments, ${message.author}!`;
    if (command.usage)
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    return message.channel.send(reply);
  }
  // Cooldown for commands
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
    command.execute(message);
  } catch (error) {
    // Will print the error in console
    console.error(error);
    // Will send the error to you in DM's
    message.client.users.cache
      .get("<your_ID>")
      .send(`[${curr_time()}] ${message.author} (${message.content}) ${error}`);
  }
});

client.login(token);
