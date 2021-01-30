const { /*Util,*/ MessageEmbed } = require("discord.js");
const { curr_time } = require("../util/curr_time.js");
//const { getTime } = require('../util/getTime');
//const ytdl = require('ytdl-core');
const fs = require("fs");
module.exports = {
  name: "play",
  usage: "play < nameOfVoice >",
  description: "Plays a voice from music folder",
  args: true,
  cooldown: 5,
  async execute(message, loop = 0) {
    try {
      // Getting name of the voice
      const args = message.content.split(/ +/);
      args.shift();
      const queue = message.client.queue;
      const serverQueue = queue.get(message.guild.id);
      const voiceChannel = message.member.voice.channel;
      // If not in channel, join the one where the author (of this message) is
      if (!voiceChannel)
        return message.reply(
          " You need to be in a voice channel to play music!"
        );
      let song = {
        title: args[0],
        path: "./music_folder/" + args[0] + ".mp3",
        /*yt: false, len: 0,*/
      };
      if (!fs.existsSync(song.path))
        return message.channel.send("This song does not exists!");
      // Create queue
      if (!serverQueue) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 0.5,
          loop: loop,
          playing: true,
        };
        queue.set(message.guild.id, queueContruct);
        queueContruct.songs.push(song);
        try {
          // Try to play voice
          let connection = await voiceChannel.join();
          queueContruct.connection = connection;
          //queueContruct.textChannel.send(`🎶 Playing: **${song.title}**`);
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
          /*.addFields( { name: 'Time until playing (YT only)', value: `${getTime(parseInt(serverQueue.len))}`, inline: true },
                                { name: 'Postition in queue', value: `\`${serverQueue.songs.length}\``, inline: true } );*/
          .setDescription(`Postition in queue \`${serverQueue.songs.length}\``);
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
    /*if (song.yt) // for YouTube
            dispatcher = serverQueue.connection.play(ytdl(song.url, { filter:"audioonly" }));
        else*/
    dispatcher = serverQueue.connection.play(song.path);
    dispatcher
      .on("finish", () => {
        // Loop or not
        if (serverQueue.loop == 0) serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", (error) =>
        message.client.users.cache
          .get("<your_id>")
          .send(
            `[${curr_time()}] ${message.author} (${message.content}) ${error}`
          )
      );
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 1);
  },
};
