const fs = require("fs");
const Discord = require("discord.js");
const Client = require("./client/Client");
const { prefix, token } = require("./config.json");

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

let data = [];

console.log(client.commands);

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async (message) => {
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if (message.author.bot) return;
  if (Number(message.content) < 11 && Number(message.content) > 0) {
	const index = Number(message.content);
    const cmd = client.commands.get("select");
    cmd.execute(message, data, index);
  }
  if (!message.content.startsWith(prefix)) return;

  try {
    if (commandName == "ban" || commandName == "userinfo") {
      command.execute(message, client);
    } else if (commandName == "search") {
      data = command.execute(message);
    } else {
      command.execute(message);
    }
  } catch (error) {
    console.error(error);
    message.reply(
      "Em chưa được anh Tú setup lệnh này xin lỗi vì sự bất tiện này!"
    );
  }
});

client.login(token);
