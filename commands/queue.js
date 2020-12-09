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
    for (let i = 1; i < 10; i++) {
      let s = serverQueue.songs[i];
      if (!s) break;
      if (s.yt)
        links += `\`${i}.\` [${s.title}](${s.url}) \| \`${getTime(s.len)}\`\n`;
      else links += `\`${i}.\` ${s.title} \| \`list\`\n`;
    }
    embed.setTitle("Queue").setDescription(links);
    return message.channel.send(embed);
  },
};
