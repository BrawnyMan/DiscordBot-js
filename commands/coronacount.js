const { MessageEmbed } = require("discord.js");
const { curr_time } = require("../util/curr_time.js");
const rp = require("request-promise");
const $ = require("cheerio");
const url = "https://www.worldometers.info/coronavirus/";
module.exports = {
  name: "coronacount",
  usage: "coronacount",
  description: "Corona count",
  aliases: ["cc"],
  cooldown: 60,
  execute(message) {
    // Get pure html form website/url
    rp(url)
      .then(function (html) {
        // Search for specific part of that website with cheerio
        let smt = $(".maincounter-number > span", html).text().replace(" ", "");
        // Get numbers for specific group
        //-------------------------------
        // 99,481,692 2,133,39171,513,840
        //   0   1     2   3     4   5
        //       !         !
        //|       ---|      ---|
        //-------------------------------
        let commas = [];
        for (let i = 0; i < smt.length; i++) if (smt[i] == ",") commas.push(i);
        const CASES = smt.slice(0, commas[1] + 4);
        const DEATHS = smt.slice(commas[1] + 4, commas[3] + 4);
        const RECOVERED = smt.slice(commas[3] + 4, smt.length);
        // Make embed
        const embed = new MessageEmbed()
          .setColor("#FF0000")
          .setTitle("**__Corona Count__**")
          .setThumbnail(
            "https://www.worldometers.info/img/worldometers-logo.gif"
          )
          .addFields(
            { name: "**Cases: **", value: `${CASES.replace(/,/g, " ")}` },
            { name: "**Deaths: **", value: `${DEATHS.replace(/,/g, " ")}` },
            {
              name: "**Recovered: **",
              value: `${RECOVERED.replace(/,/g, " ")}`,
            }
          );
        message.channel.send(embed);
      })
      .catch(function (err) {
        message.client.users.cache
          .get("<your_id>")
          .send(
            `[${curr_time()}] ${message.author} (${message.content}) ${err}`
          );
      });
  },
};
