module.exports = {
  name: "dc",
  usage: "dc",
  description: "Disconnect the bot",
  aliases: ["leave"],
  execute(message) {
    const voiceChannel = message.member.voice.channel;
    // If channel does not exists, can not leave it
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to disconnect a bot!"
      );
    voiceChannel.leave();
  },
};
