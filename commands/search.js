const search = require("../util/search");
module.exports = {
  name: "search",
  description: "Tìm kiếm bài hát!",

  async execute(message) {
    try {
      
      const args = message.content.split("search ");
      const voiceChannel = message.member.voice.channel;

      if (!voiceChannel)
        return message.channel.send(
          "```diff\n- Bạn cần ở trong một kênh thoại để phát nhạc!```"
        );
      const permissions = voiceChannel.permissionsFor(message.client.user);

      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
          "```Tôi cần quyền để tham gia và nói trong kênh thoại của bạn!```"
        );
      }

      let videos = await search(args[1]);
      let string = ">>> ";
      

      videos.forEach(function (v, index) {
        string += `[${index + 1}] - ${v.title} (${v.timestamp}) | ${
          v.author.name
        } \n`;
      });
      message.channel.send(string);
      return videos;

    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
}