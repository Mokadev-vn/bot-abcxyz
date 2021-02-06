const request = require("request");

module.exports = {
  name: "covid",
  description: "Xem tình trạng dịch bệnh ở việt nam và thế giới",
	execute(message) {

	let now = new Date();
	now = now.getDay()+'/'+now.getMonth()+'/'+now.getFullYear();

    request.get("https://corona.lmao.ninja/v3/covid-19/all", function (req, res) {
		let total = JSON.parse(res.body);
		request.get("https://corona.lmao.ninja/v3/covid-19/countries/vn", function (req, res) {
			let country = JSON.parse(res.body);
			const content = {
				"embed": {
				  "color": 13632027,
				  "footer": {
					"icon_url": "https://i.imgur.com/kNBARt4.png",
					"text": "Code by Mokdev"
				  },
				  "author": {
					"name": "Mlem Mlem",
					"url": "https://www.facebook.com/localhost.xyz",
					"icon_url": "https://i.imgur.com/kNBARt4.png"
				  },
				  "fields": [
					{
					  "name": "Tình hình dịch bệnh ngày "+now,
					  "value": "---------------------------------------------------------"
					},
					{
					  "name": "Tổng ca bệnh thế giới ",
					  "value": total.cases,
					  "inline": true
					},
					{
					  "name": "Ra đi",
					  "value": total.deaths,
					  "inline": true
					},
					{
					  "name": "Ở lại",
					  "value": total.recovered,
					  "inline": true
					},
					{
					  "name": "Tổng ca bệnh Việt Nam",
					  "value": country.cases,
					  "inline": true
					},
					{
					  "name": "Ra đi",
					  "value": country.deaths,
					  "inline": true
					},
					{
					  "name": "Ở lại",
					  "value": country.recovered,
					  "inline": true
					}
				  ]
				}
			  }		
			  return message.channel.send(content);
		});
	});



  },
};
