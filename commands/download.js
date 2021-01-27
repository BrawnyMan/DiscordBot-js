const { MessageEmbed } = require("discord.js");
const { prefix } = require("../config.json");
const fs = require("fs");
module.exports = {
  name: "download",
  usage: "download <name_of_voice>",
  args: true,
  description: "Downloads voice for user",
  execute(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    args.shift();
    const path = `./music_file/${args[0]}.mp3`;
    console.log(path);
    // Checks if file exists
    fs.access(path, fs.F_OK, (err) => {
      // Sends error message in channel
      if (err) return message.channel.send("Error: " + err.message);
      // Sends file to user in DM
      return message.author.send({ files: [path] });
    });
  },
};
