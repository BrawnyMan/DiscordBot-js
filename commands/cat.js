const fetch = require("node-fetch");
module.exports = {
  name: "cat",
  usage: "cat",
  description: "Display a cat",
  // Gets url of image or .gif of random cat
  async execute(message) {
    const { file } = await fetch(
      "https://aws.random.cat/meow"
    ).then((response) => response.json());
    message.channel.send(file);
  },
};
