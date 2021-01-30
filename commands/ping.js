module.exports = {
  name: "ping",
  usage: "ping",
  description: "Ping! Delay between bot and Discord server",
  execute(message) {
    message.channel.send(
      `Pong! => ${Math.abs(Date.now() - message.createdTimestamp)} ms`
    );
  },
};
