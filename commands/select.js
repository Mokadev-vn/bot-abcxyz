const ytdl = require("ytdl-core");
module.exports = {
  name: "select",
  description: "Select!",
  async execute(message, data, index) {
    try {
        const self = this;
      const queue = message.client.queue;
      const serverQueue = message.client.queue.get(message.guild.id);
        
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel)
        return message.channel.send(
          "Bạn cần ở trong một kênh thoại để phát nhạc!"
        );
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
          "Tôi cần quyền để tham gia và nói trong kênh thoại của bạn!"
        );
      }
      data.then(async function(video){

        const songInfo = video[index-1];
        const song = {
          title: songInfo.title,
          url: songInfo.url,
        };

        if (!serverQueue) {
            const queueContruct = {
              textChannel: message.channel,
              voiceChannel: voiceChannel,
              connection: null,
              songs: [],
              volume: 5,
              playing: true,
            };
    
            queue.set(message.guild.id, queueContruct);
    
            queueContruct.songs.push(song);
    
            try {
              var connection = await voiceChannel.join();
              queueContruct.connection = connection;
              self.play(message, queueContruct.songs[0]);
            } catch (err) {
              console.log(err);
              queue.delete(message.guild.id);
              return message.channel.send(err);
            }
          } else {
            serverQueue.songs.push(song);
            return message.channel.send(`${song.title} đã được thêm vào hàng đợi!`);
          }

      });
      
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },

  play(message, song) {
    const queue = message.client.queue;
    const guild = message.guild;
    const serverQueue = queue.get(message.guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", (error) => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Bắt đầu phát: **${song.title}**`);
  },
};
