const { getUserFromMention } = require("../util/getUser");
module.exports = {
  name: "avatar",
  usage: "avatar  |  avatar < tag >",
  description: "Displays your or someone's avatar",
  aliases: ["icon", "pfp"],
  execute(message) {
    if (!message.mentions.users.size)
      return message.channel.send(
        message.author.displayAvatarURL({ dynamic: true })
      );
    return message.channel.send(
      getUserFromMention(message).displayAvatarURL({ dymanic: true })
    );
  },
};
