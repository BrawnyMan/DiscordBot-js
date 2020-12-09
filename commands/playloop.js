const { MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "playloop",
  usage: "playloop < nameOfVoice >",
  description: "Loops a song in your voice channel",
  args: true,
  cooldown: 1,
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
        len: 0,
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
          len: 0,
          loop: 1,
          playing: true,
        };
        queue.set(message.guild.id, queueContruct);
        queueContruct.songs.push(song);
        queueContruct.len += parseInt(song.len);
        try {
          let connection = await voiceChannel.join();
          queueContruct.connection = connection;
          this.play(message, queueContruct.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {
        if (serverQueue.songs.length >= 100)
          return message.channel.send(
            "Cannot add more than 100 songs to queue!"
          );
        serverQueue.songs.push(song);
        const ifList = song.yt ? `${song.title}` : `${song.title}`;
        const embed = new MessageEmbed()
          .setAuthor(
            "Added to queue",
            `${message.author.displayAvatarURL({ dynamic: true })}`
          )
          .setTitle(`${ifList}`)
          .setDescription(`Postition in queue \`${serverQueue.songs.length}\``);
        serverQueue.len += parseInt(song.len);
        serverQueue.loop = 1;
        return message.channel.send(embed);
      }
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
  play(message, song) {
    let dispatcher;
    const queue = message.client.queue;
    const serverQueue = queue.get(message.guild.id);
    if (!song) {
      time = 0;
      queue.delete(message.guild.id);
      return;
    }
    dispatcher = serverQueue.connection.play(song.url);
    dispatcher
      .on("finish", () => {
        serverQueue.len -= parseInt(song.len);
        // if looop no shift
        if (serverQueue.loop == 0) serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", (error) => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 1);
  },
};
