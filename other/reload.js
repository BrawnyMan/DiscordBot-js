const { prefix } = require("../config.json");
module.exports = (message) => {
  // Reload command so that you don't have to restart bot
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args[1];
  const command =
    message.client.commands.get(commandName) ||
    message.client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command)
    return message.channel.send(
      `There is no command with name or alias \`${commandName}\`, ${message.author}!`
    );
  delete require.cache[require.resolve(`../commands/${command.name}.js`)];
  try {
    const newCommand = require(`../commands/${command.name}.js`);
    message.client.commands.set(newCommand.name, newCommand);
  } catch (error) {
    message.channel.send(
      `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
    );
  }
};
