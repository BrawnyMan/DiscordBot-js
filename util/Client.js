// How is bot/client made
const { Client, Collection } = require("discord.js");
module.exports = class extends (
  Client
) {
  constructor() {
    super();
    this.commands = new Collection();
    this.cooldowns = new Collection();
    this.queue = new Map();
  }
};
