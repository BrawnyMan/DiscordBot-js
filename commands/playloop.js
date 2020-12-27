const { MessageEmbed } = require("discord.js");
const { curr_time } = require("../util/curr_time.js");
const fs = require("fs");
module.exports = {
  name: "playloop",
  usage: "playloop < nameOfVoice >",
  description: "Loops a song in your voice channel",
  args: true,
  cooldown: 5,
  async execute(message) {
    try {
      const args = message.content.split(/ +/);
      args.shift();
      const queue = message.client.queue;
      const serverQueue = queue.get(message.guild.id);
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel)
        return message.reply(
          " You need to be in a voice channel to play music!"
        );
      let song = {
        title: args[0],
        url: "./music_file/" + args[0] + ".mp3",
      };
      if (!fs.existsSync(song.url))
        return message.channel.send("This song does not exists!");
      if (!serverQueue) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 0.5,
          loop: 1,
          playing: true,
        };
        queue.set(message.guild.id, queueContruct);
        queueContruct.songs.push(song);
        try {
          let connection = await voiceChannel.join();
          queueContruct.connection = connection;
          this.play(message, queueContruct.songs[0]);
        } catch (err) {
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {
        if (serverQueue.songs.length >= 100)
          return message.channel.send(
            "Cannot add more than 100 songs to queue!"
          );
        serverQueue.songs.push(song);
        const embed = new MessageEmbed()
          .setAuthor(
            "Added to queue",
            `${message.author.displayAvatarURL({ dynamic: true })}`
          )
          .setTitle(`${song.title}`)
          .setDescription(`Postition in queue \`${serverQueue.songs.length}\``);
        serverQueue.loop = 1;
        return message.channel.send(embed);
      }
    } catch (error) {
      message.channel.send(error.message);
    }
  },
  play(message, song) {
    let dispatcher;
    const queue = message.client.queue;
    const serverQueue = queue.get(message.guild.id);
    if (!song) {
      queue.delete(message.guild.id);
      return;
    }
    dispatcher = serverQueue.connection.play(song.url);
    dispatcher
      .on("finish", () => {
        // if loop no shift
        if (serverQueue.loop == 0) serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", (error) =>
        message.client.users.cache
          .get("<your_ID>")
          .send(
            `[${curr_time()}] ${message.author} (${message.content}) ${error}`
          )
      );
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 1);
  },
};