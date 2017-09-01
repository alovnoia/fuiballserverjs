'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GroundSchema = new Schema({
  owner: String,
  name: String,
  address: String,
  phone: String,
  area: String,
  city: String,
  location: [{lat: String, long: String}],
  ground_type: String,
  menu: [
    {pitch_id: String}
  ],
  service: [
    {name: String, price: String}
  ],
  desc: String,
  deleted: Boolean
});

module.exports = mongoose.model('Ground', GroundSchema);

//du lieu mau
/*{
  "owner": "59716b6fd33953099c30dcce"
  "address": "30 Hoàng Minh Giám",
  "name": "Thành Phát",
  "phone": "093828121",
  "area": "Cầu giấy",
  "city": "Hà Nội",
  "ground_type": "sân cỏ",
  "desc": "",
  "deleted": false,
  "service": [
    {"name": "nước", "price": "40000"},{"name": "bóng", "price": "20000"}
  ],
  "menu": [
  ""
  ],
  "location": [
    {"lat": "21.005720","long": "105.796830"}
  ]
}*/