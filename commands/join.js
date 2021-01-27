module.exports = {
  name: "join",
  usage: "join",
  description: "Joins the voice channel",
  async execute(message) {
    const voiceChannel = message.member.voice.channel;
    // No channel, no join
    if (!voiceChannel)
      return message.reply(" You need to be in a voice channel to play music!");
    try {
      await voiceChannel.join();
    } catch (err) {
      return message.channel.send(err);
    }
  },
};
