const { MessageEmbed } = require("discord.js");
const { getTime } = require("../util/getTime");
module.exports = {
  name: "queue",
  usage: "queue",
  description: "Display a queue",
  aliases: ["q"],
  cooldown: 5,
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("There is nothing playing.");
    let links = "";
    const embed = new MessageEmbed();
    // Show first 10 voices on queue
    for (let i = 1; i < 10; i++) {
      let s = serverQueue.songs[i];
      if (!s) break;
      links += `\`${i}.\` ${s.title}\n`;
    }
    embed.setTitle("Queue").setDescription(links);
    return message.channel.send(embed);
  },
};
