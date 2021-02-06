const { getUserFromMention } = require('../util/getUser')

module.exports = {
	name: 'ban',
	description: 'Cấm người chơi',
	execute(message, client) {
		const split = message.content.split(/ +/);
		const args = split.slice(1);

		const member = getUserFromMention(args[0], client);

		if (!member) {
			return message.reply('Bạn cần đề cập đến thành viên mà bạn muốn cấm anh ta');
		}

		if (!message.member.permissions.has("BAN_MEMBERS")) {
			return message.reply('Tôi không thể cấm người dùng này.');
		}

		return message.guild.members.ban(member)
			.then(() => message.reply(`${member.username} đã bị cấm`))
			.catch(error => message.reply('Có lỗi xảy ra!'));
	},
};