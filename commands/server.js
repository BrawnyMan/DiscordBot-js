const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "server",
  usage: "server",
  description: "Displays info about this server",
  execute(message) {
    const region =
      message.guild.region.charAt(0).toUpperCase() +
      message.guild.region.slice(1);
    const embed = new MessageEmbed()
      .setColor("#008000")
      .setTitle("Server")
      .setThumbnail(`${message.client.user.displayAvatarURL()}`)
      .addFields(
        { name: "**Server name**", value: `${message.guild.name}` },
        { name: "**Total members**", value: `${message.guild.memberCount}` },
        { name: "**Server's region**", value: `${region}` }
      );
    message.channel.send(embed);
  },
};
