module.exports = {
  name: "ping",
  usage: "ping",
  description: "Ping!",
  execute(message) {
    message.channel.send(
      `Pong! => ${Math.abs(Date.now() - message.createdTimestamp)} ms`
    );
  },
};
