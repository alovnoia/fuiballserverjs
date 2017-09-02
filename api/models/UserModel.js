'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  fbid: {
    type: String,
    sparse: true
  },
  name: String,
  phone: String,
  username: {
    type: String,
    sparse: true
  },
  password: String,
  avatar: String,
  like: []
});

module.exports = mongoose.model('User', UserSchema);

//du lieu mau
/*{
"username": "test5",
"password": "1",
"name": "Thanh Son",
"phone": "017284737",
"avatar": "",
"like": []
}*/