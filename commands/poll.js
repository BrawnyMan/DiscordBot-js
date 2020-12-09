const { prefix } = require("../config.json");
module.exports = {
  name: "poll",
  usage: "poll < question >",
  description: "Create a poll for voting",
  args: true,
  cooldown: 10,
  aliases: ["question", "ask"],
  execute(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    args.shift();
    const mention = message.author;
    message.channel.bulkDelete(1);
    message.channel
      .send(`${mention}'s question: ${args.join(" ")}?`)
      .then((sent) => {
        sent
          .react("✅")
          .then(() => sent.react("❌"))
          .catch(() => console.error("One of the emojis failed to react."));
      });
  },
};
