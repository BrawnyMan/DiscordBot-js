module.exports = {
  name: "join",
  usage: "join",
  description: "Joins the voice channel",
  cooldown: 5,
  async execute(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.reply(" You need to be in a voice channel to play music!");
    try {
      await voiceChannel.join();
    } catch (err) {
      console.log(err);
      return message.channel.send(err);
    }
  },
};
