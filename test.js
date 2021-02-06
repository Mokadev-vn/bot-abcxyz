const request = require('request');

request.get('https://iap.poly.edu.vn/user/ph/PH10345.jpg',function(req,res){
    console.log(res.statusCode);
});