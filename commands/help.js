const fs = require("fs");
const { prefix } = require("../config.json");
module.exports = {
  name: "help",
  description: "Danh sách câu lệnh.",
  execute(message) {
    let fields = [
      {
        name: "Đây là lệnh để gọi em nè",
        value: "---------------------------------------------------------",
      },
    ];
    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      if (command.name != "select") {
        fields.push({
          name: `${prefix}${command.name}`,
          value: command.description,
          inline: true,
        });
      }
    }

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
        fields
      },
    };
    message.channel.send(content);
  },
};
