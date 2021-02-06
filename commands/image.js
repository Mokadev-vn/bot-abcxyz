const request = require("request");

module.exports = {
  name: "image",
  description: "Lấy ảnh sinh viên theo mã sinh viên",
  execute(message) {
    const args = message.content.split(" ");
    let code = args[1].replace("ph", "");
    const link = `https://iap.poly.edu.vn/user/ph/PH${code}.jpg`;

    request.get(
      link,
      function (req, res) {
        if(res.statusCode === 200) {
			return message.channel.send('Ảnh của PH'+code,{ files: [link] });
		}
		return message.channel.send('```Em không tìm thấy ảnh của mã sinh viên PH'+code+' em xin lỗi ạ!```');
      }
    );
    
  },
};
