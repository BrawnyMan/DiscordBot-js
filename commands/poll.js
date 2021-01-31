const { prefix } = require("../config.json");
const { curr_time } = require("../util/curr_time.js");
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
          .catch(() =>
            message.client.users.cache
              .get("<your_id>")
              .send(
                `[${curr_time()}] ${message.author} (${
                  message.content
                }) ${error}`
              )
          );
      });
  },
};
