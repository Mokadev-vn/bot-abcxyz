const fs = require('fs')
const { prefix } = require('../config.json');
module.exports = {
	name: 'help',
	description: 'Danh sách câu lệnh.',
	execute(message) {
		let str = '';
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./${file}`);
			if(command.name != 'select'){
				str += `${prefix}${command.name} -> ${command.description} \n`;
			}
		}

		message.channel.send(str);
	},
};