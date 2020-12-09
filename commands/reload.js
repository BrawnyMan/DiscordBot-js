const { prefix } = require("../config.json");
module.exports = {
  name: "reload",
  usage: "reload < command >",
  description: "Reload the command",
  args: true,
  execute(message) {
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
    delete require.cache[require.resolve(`./${command.name}.js`)];
    try {
      const newCommand = require(`./${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
    } catch (error) {
      console.log(error);
      message.channel.send(
        `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
      );
    }
  },
};
