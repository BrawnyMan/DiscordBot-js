const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "loop",
  usage: "loop",
  description: "Loops the song",
  aliases: ["repeat"],
  execute(message) {
    // Getting queue and changing property for looping
    const queue = message.client.queue;
    const serverQueue = queue.get(message.guild.id);
    if (serverQueue) {
      const embed = new MessageEmbed().setColor("#0DF9C3");
      if (serverQueue.loop == 1) {
        serverQueue.loop = 0;
        embed.setTitle("🔁 LOOP DISABLE");
      } else {
        serverQueue.loop = 1;
        embed.setTitle("🔁 LOOP ENABLE");
      }
      message.channel.send(embed);
    }
  },
};
