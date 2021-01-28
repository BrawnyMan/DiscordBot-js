const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "nowplaying",
  usage: "nowplaying",
  description: "Get the song that is playing",
  aliases: ["np"],
  execute(message) {
    // Getting queue and displaying currently playing voice
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("There is nothing playing.");
    const embed = new MessageEmbed().setAuthor(
      "Now playing 🎵",
      `${message.client.user.displayAvatarURL()}`
    );
    embed.setTitle(`${serverQueue.songs[0].title}`);
    return message.channel.send(embed);
  },
};
