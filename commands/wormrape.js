const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "wormrape",
  usage: "wormrape",
  description: "Show pretty worm and rape your eyes",
  cooldown: 5,
  aliases: ["worm"],
  execute(message) {
    const attachment = new MessageAttachment("https://i.imgur.com/fCjhekk.gif");
    message.channel.send(attachment);
  },
};
