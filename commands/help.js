const { prefix } = require("../config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "help",
  usage: "help",
  description: "List commands",
  aliases: ["commands"],
  execute(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    args.shift();
    const data = [];
    const { commands } = message.client;
    const embed = new MessageEmbed()
      .setTitle("Help commands")
      .setColor("#008000")
      .setThumbnail(`${message.client.user.displayAvatarargs()}`);
    commands.forEach((cmd) => {
      if (cmd.aliases) {
        const ali = cmd.aliases.join(", ");
        embed.addField(
          `**${prefix}${cmd.usage}**`,
          `${cmd.description} | Aliases: < ${ali} >`
        );
      } else {
        embed.addField(`**${prefix}${cmd.usage}**`, `${cmd.description}`);
      }
    });
    data.push(embed);
    return message.author.send(data, { split: true });
  },
};
