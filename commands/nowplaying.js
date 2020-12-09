const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "nowplaying",
  usage: "nowplaying",
  description: "Get the song that is playing",
  cooldown: 5,
  aliases: ["np"],
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("There is nothing playing.");
    const embed = new MessageEmbed().setAuthor(
      "Now playing 🎵",
      `${message.client.user.displayAvatarURL()}`
    );
    if (serverQueue.songs[0].yt) {
      embed
        .setTitle(`${serverQueue.songs[0].title}`)
        .setURL(`${serverQueue.songs[0].url}`);
    } else {
      embed.setTitle(`${serverQueue.songs[0].title} (List)`);
    }
    return message.channel.send(embed);
  },
};
