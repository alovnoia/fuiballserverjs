'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PitchSchema = new Schema({
  name: String,
  order: [
    {
      date: String, 
      from: String, 
      to: String, 
      price: String, 
      user_id: String,
      status: {
        type: String,
        default: "pending"
      }
    }
  ],
  deleted: Boolean
});

module.exports = mongoose.model('Pitch', PitchSchema);

// du lieu mau
/*{
"name": "Sân 3",
"order": [
  {"date": "20-08-2017", "from": "7:00", "to": "8:30", "price": "0", "status": "ok", "user_id": "5989b96f7f94ff1c24e6df0b"},
  {"date": "21-08-2017", "from": "8:30", "to": "10:00", "price": "0", "status": "pending", "user_id": "5989bba02d9554186477620a"},
  {"date": "23-08-2017", "from": "10:00", "to": "11:30", "price": "0", "status": "reject", "user_id": "5989bb372d95541864776208"},
  {"date": "23-08-2017", "from": "13:30", "to": "15:00", "price": "0", "status": "ok", "user_id": "5989bb722d95541864776209"},
  {"date": "20-08-2017", "from": "15:00", "to": "16:30", "price": "0", "status": "ok", "user_id": "5989bbac2d9554186477620b"}
],
"deleted": false
}*/