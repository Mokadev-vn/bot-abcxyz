module.exports = {
  name: "list",
  description: "Xem danh sách bài hát chờ!.",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue || serverQueue.songs.length <= 1)
      return message.channel.send("Không có bài nào trong danh sách chờ!");

    let description = "";

    serverQueue.songs.forEach((v, index) => {
        if(index === 0) return;
        
        description +=  `[${index}] ${v.title}\n`;
    });

    const content = {
      embed: {
        title: "Danh sách bài hát đang chờ: ",
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
        description,
      },
    };
    return message.channel.send(content);
  },
};
