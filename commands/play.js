const ytdl = require("ytdl-core");

module.exports = {
  name: "play",
  description: "Phát một bài hát trong kênh của bạn!",
  async execute(message) {
    try {
      
      const args = message.content.split(" ");
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

      const songInfo = await ytdl.getInfo(args[1]);
      const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        thumbnail: songInfo.videoDetails.thumbnails[1].url
      };
      const image = songInfo.videoDetails.thumbnails[1].url;

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
          this.play(message, queueContruct.songs[0], image);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {
        serverQueue.songs.push(song);
        const content = {
          embed: {
            color: 13632027,
            footer: {
              icon_url: "https://i.imgur.com/kNBARt4.png",
              text: "Code by Mokdev",
            },
            author: {
              name: "Mlem Mlem",
              url: "https://www.facebook.com/localhost.xyz",
              icon_url: "https://i.imgur.com/kNBARt4.png",
            },
            thumbnail: {
              url: image,
            },
            fields: [
              {
                name: "Đang xếp hàng cho:",
                value: song.title,
              },
            ],
          },
        };
        return message.channel.send(content);
      }
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },

  play(message, song, image) {
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
    const content = {
      embed: {
        color: 13632027,
        footer: {
          icon_url: "https://i.imgur.com/kNBARt4.png",
          text: "Code by Mokdev",
        },
        author: {
          name: "Mlem Mlem",
          url: "https://www.facebook.com/localhost.xyz",
          icon_url: "https://i.imgur.com/kNBARt4.png",
        },
        thumbnail: {
          url: image,
        },
        fields: [
          {
            name: "Bắt đầu phát:",
            value: song.title,
          },
        ],
      },
    };
    serverQueue.textChannel.send(content);
  },
};
