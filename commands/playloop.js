const play = require("./play.js");
module.exports = {
  name: "playloop",
  usage: "playloop < nameOfVoice >",
  description: "Plays a voice on repeat",
  args: true,
  cooldown: 5,
  async execute(message) {
    // Runs play file, but with loop enabled
    play.execute(message, 1);
  },
};
