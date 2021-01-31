const { getFileNames } = require("./musiclist.js");
const { execute } = require("./play.js");
const { MessageEmbed, Message } = require("discord.js");
module.exports = {
  name: "randmusic",
  usage: "randmusic",
  description: "Plays random voice",
  aliases: ["r", "rand", "random"],
  execute(message) {
    let voices = getFileNames();
    const num = Math.floor(Math.random() * (voices.length - 1));
    message.content = `~play ${voices[num]}`;
    const embed = new MessageEmbed()
      .setTitle("Playing")
      .setDescription(`\`${voices[num]}\``)
      .setColor("#008000");
    message.channel.send(embed);
    execute(message);
  },
};
