// Clears messages
const { prefix } = require("../config.json");
const { curr_time } = require("../util/curr_time.js");
module.exports = (message) => {
  const args = message.content.slice(prefix.length).split(/ +/);
  const amount = parseInt(args[1]) + 1;
  if (isNaN(amount))
    return message.reply("that doesn't seem to be a valid number.");
  else if (amount <= 1 || amount > 100)
    return message.reply("you need to input a number between 1 and 99.");
  message.channel.bulkDelete(amount, true).catch((err) => {
    message.client.users.cache
      .get("345972187007680533")
      .send(`[${curr_time()}] ${message.author} (${message.content}) ${err}`);
    message.channel.send(
      "there was an error trying to prune messages in this channel!"
    );
  });
};
