module.exports = {
	name: 'purge',
	description: 'Xóa các tin nhắn cuối cùng trong tất cả các cuộc trò chuyện.',
	async execute(message) {
		const args = message.content.split(' ');
		let deleteCount = 0;
		try {
			deleteCount = parseInt(args[1], 10);
		}catch(err) {
			return message.reply('Vui lòng cung cấp số lượng tin nhắn cần xóa. (tối đa 100)')
		}
        

		if (!deleteCount || deleteCount < 2 || deleteCount > 100)
			return message.reply('Vui lòng cung cấp một số từ 2 đến 100 cho số lượng tin nhắn cần xóa');

		const fetched = await message.channel.messages.fetch({
			limit: deleteCount,
		});
		message.channel.bulkDelete(fetched)
			.catch(error => message.reply(`Không thể xóa tin nhắn vì: ${error}`));
	},
};