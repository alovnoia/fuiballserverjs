'use strict';


var mongoose = require('mongoose'),
  us = mongoose.model('City');

exports.list_all_city = function(req, res) {
  us.find({}, function(err, city) {
    if (err)
      res.send(err);
    res.json(city);
  });
};


exports.add_city = function(req, res) {
    var new_ground = new us(req.body);
    new_ground.save(function(err, city) {
      if (err)
        res.send(err);
      res.json(city);
    });
};


exports.get_a_city = function(req, res) {
  us.findById(req.params.cityId, function(err, city) {
    if (err)
      res.send(err);
    res.json(city);
  });
};


exports.update_a_city = function(req, res) {
  us.findOneAndUpdate({_id: req.params.cityId}, req.body, {new: true}, function(err, city) {
    if (err)
      res.send(err);
    res.json(city);
  });
};


exports.delete_a_city = function(req, res) {

  us.remove({
    _id: req.params.cityId
  }, function(err, city) {
    if (err)
      res.send(err);
    res.json({ message: 'Ground successfully deleted' });
  });
};