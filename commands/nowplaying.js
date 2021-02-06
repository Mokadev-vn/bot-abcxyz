module.exports = {
	name: 'nowplaying',
	description: 'Xem bài hát đang phát.',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Không có bài nào để phát!');
		return message.channel.send(`Đang phát: ${serverQueue.songs[0].title}`);
	},
};