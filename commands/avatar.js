const { getUserFromMention } = require("../util/getUser");
module.exports = {
  name: "avatar",
  usage: "avatar  |  avatar < tag >",
  description: "Displays your or someone's avatar",
  aliases: ["icon", "pfp"],
  execute(message) {
    // If user is mentioned
    if (!message.mentions.users.size)
      return message.channel.send(
        message.author.displayAvatarURL({ dynamic: true })
      );
    // If no user is mentioned, display authors avatar
    return message.channel.send(
      getUserFromMention(message).displayAvatarURL({ dymanic: true })
    );
  },
};
