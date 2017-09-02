'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CitySchema = new Schema({
  name: String,
  area: [
    
  ]
});

module.exports = mongoose.model('City', CitySchema);
