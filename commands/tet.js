const fs = require('fs')

module.exports = {
	name: 'tet',
	description: 'Xem còn mấy ngày nữa đến tết.',
	execute(message) {
        let now = new Date();
        let tet = new Date('02/12/2021');
        let end = new Date(tet - now);
        end = end.getDate();
        let str = `Còn ${end} nữa là đến Tết 2021`;
		message.channel.send(str);
	},
};