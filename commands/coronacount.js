const { MessageEmbed } = require("discord.js");
const rp = require("request-promise");
const $ = require("cheerio");
const url = "https://www.worldometers.info/coronavirus/";
module.exports = {
  name: "coronacount",
  usage: "coronacount",
  description: "Corona count",
  aliases: ["cc"],
  cooldown: 5,
  execute(message) {
    rp(url)
      .then(function (html) {
        //success
        let count = $(".maincounter-number > span", html)
          .text()
          .substring(0, 10)
          .split(",")
          .join("");
        parseInt(count, 10);
        let c = $(".maincounter-number > span", html)
          .text()
          .substring(0, 10)
          .split(",")
          .join(" ");
        let d = $(".maincounter-number > span", html)
          .text()
          .substring(10, 20)
          .split(",")
          .join(" ");
        let r = $(".maincounter-number > span", html)
          .text()
          .substring(20, 30)
          .split(",")
          .join(" ");
        const embed = new MessageEmbed()
          .setColor("#FF0000")
          .setTitle("**__Corona Count__**")
          .setThumbnail(
            "https://www.worldometers.info/img/worldometers-logo.gif"
          )
          .addFields(
            { name: "**Cases: **", value: `${c}` },
            { name: "**Deaths: **", value: `${d}` },
            { name: "**Recovered: **", value: `${r}` }
          );
        message.channel.bulkDelete(1);
        message.channel.send(embed);
      })
      .catch(function (err) {
        console.log(err); //handle error
      });
  },
};
