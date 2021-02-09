module.exports = {
	name: 'chui',
	description: 'Bật tính năng chửi để giải trí nhấn 1 để bật 0 để tắt',
	execute(message) {
        const args = message.content.split(" ");
        if(args[1] != 0 || args[1] != 1) return message.channel.send("Vui lòng chọn 0 hoặc 1");
        let str = (args[1] == 1) ? "Đã bật tính năng chửi" : "Đã tắt tính năng chửi";
		message.channel.send(str);
        return args[1];
	},
};