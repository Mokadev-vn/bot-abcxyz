module.exports = {
	name: 'skip',
	description: 'Bỏ qua một bài hát!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send('Bạn phải ở trong một kênh thoại để dừng âm nhạc!');
		if (!serverQueue) return message.channel.send('Không có bài hát nào mà tôi có thể bỏ qua!');
		serverQueue.connection.dispatcher.end();
	},
};