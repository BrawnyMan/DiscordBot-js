const { MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "musiclist",
  usage: "musicList",
  description: "Displays music Collection",
  aliases: ["mlist"],
  execute(message) {
    // Getting file names
    function getFileNames() {
      let files = fs
        .readdirSync("./music_folder")
        .filter((file) => file.endsWith(".mp3"));
      // Removing '.mp3' on the end
      return files.map((x) => x.slice(0, -4));
    }

    // Grouping ices into groups
    function getVoicesFromFileNames(fileNames, group_length) {
      let temp = [];
      let voices = [];
      for (let i = 0; i < fileNames.length; i++) {
        temp.push(fileNames[i]);
        if (temp.length >= group_length || i + 1 == fileNames.length) {
          voices.push(temp);
          temp = [];
        }
      }
      return voices;
    }

    // Groups voices by first letter
    function groupVoices(voices) {
      let v = [];
      voices.forEach((part) => {
        let dict = {};
        part.forEach((el) => {
          let firstLetter = el[0];
          if (dict[firstLetter]) dict[firstLetter].push(el);
          else dict[firstLetter] = [el];
        });
        v.push(dict);
      });
      return v;
    }

    let opt = message.content.split(/ +/);
    opt.shift();
    if (opt.length > 0) opt = opt[0].toLowerCase();
    let files = getFileNames();
    // If argument / option is alphabetic
    if (opt[0] >= "a" && opt[0] <= "z") {
      const embed = new MessageEmbed()
        .setTitle("Music Collection List")
        .setColor("#008000")
        .setThumbnail(`${message.client.user.displayAvatarURL()}`);
      // Gets all voices that start with that argument / option
      let f = files.filter((x) => x.startsWith(opt));
      if (f.length == 0) embed.addField("None", "Nothing was found");
      else embed.addField(`'${opt}' - ${f.length}`, `${f.join(", ")}`);
      message.channel.send(embed);
    } else {
      // Else groups and displays all (like a book)
      const LENGTH = 50;
      const AUTHOR = message.author;
      let voices_ungrouped = getVoicesFromFileNames(files, LENGTH);
      let voices = groupVoices(voices_ungrouped);

      const generateEmbed = (number) => {
        const embed = new MessageEmbed()
          .setTitle("Music Collection List")
          .setColor("#008000")
          .setThumbnail(`${message.client.user.displayAvatarURL()}`);
        // Displays letter and all voices that begins with it
        for (el in voices[number]) {
          embed.addField(
            `**${el.toUpperCase()}**`,
            `${voices[number][el].join(", ")}`
          );
        }
        return embed;
      };

      // Reacts and waits 60 sec for reaction and changes page if needed
      // After 60 sec it deletes reaction and changing pages is no longer posible
      message.channel.send(generateEmbed(0)).then((message) => {
        message.react("➡️");
        // Creating reaction collector
        const collector = message.createReactionCollector(
          (reaction, user) =>
            ["⬅️", "➡️"].includes(reaction.emoji.name) && user.id === AUTHOR.id,
          { time: 60000 }
        );
        let index = 0;
        // Does stuff if author has reacted
        collector.on("collect", (reaction) => {
          message.reactions.removeAll().then(async () => {
            reaction.emoji.name == "⬅️" ? index-- : index++;
            message.edit(generateEmbed(index));
            if (index != 0) await message.react("⬅️");
            if (index + 1 < voices.length) message.react("➡️");
          });
        });
        collector.on("end", () => {
          message.reactions.removeAll();
        });
      });
    }
  },
};
