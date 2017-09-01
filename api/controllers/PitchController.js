'use strict';


var mongoose = require('mongoose'),
  us = mongoose.model('Pitch'),
  g = mongoose.model('Ground');

exports.list_all_pitch = function(req, res) {
  us.find({}, function(err, pitch) {
    if (err)
      res.send(err);
    res.json(pitch);
  });
};


exports.add_pitch = function(req, res) {
    var new_pitch = new us(req.body);
    new_pitch.save(function(err, pitch) {
      if (err)
        res.send(err);
      res.json(pitch);
    });
};

exports.add_pitch_to_ground = function(req, res) {
    var new_pitch = new us(req.body);
    new_pitch.save(function(err, pitch) {
      if (err) {
        res.send(err);
      } else {
        g.findOneAndUpdate({_id: req.params.groundId}, {$push: {menu: {pitch_id: pitch._id}}}, {new: true}, function(err, ground){
          if (err)
            res.send(err);
          res.json([pitch,ground]);
        });
      }
    });
};


exports.get_a_pitch = function(req, res) {
  us.findById(req.params.pitchId, function(err, pitch) {
    if (err)
      res.send(err);
    res.json(pitch);
  });
};


exports.update_a_pitch = function(req, res) {
  us.findOneAndUpdate({_id: req.params.pitchId}, req.body, {new: true}, function(err, pitch) {
    if (err)
      res.send(err);
    res.json(pitch);
  });
};


exports.delete_a_pitch = function(req, res) {

  us.remove({
    _id: req.params.pitchId
  }, function(err, pitch) {
    if (err)
      res.send(err);
    res.json({ message: 'Pitch successfully deleted' });
  });
};

exports.get_pitch_in_ground = function(req, res) {
  us.find({'_id': {$in: req.body.lst_pitch.split(" ")}}, function(err, pitch) {
    if (err)
      res.send(err);
    res.json(pitch);
  });
};

exports.get_order_by_date = function(req, res) {
  us.find({'_id': req.params.pitchId, 'order': {'date': req.params.date}}, function(err, pitch) {
    if (err)
      res.send(err);
    res.json(pitch);
  });
};

exports.order = function(req, res) {
  var order = req.body;
  us.findOneAndUpdate({'_id': req.params.pitchId}, {$push: {order: order}}, function(err, pitch) {
    if (err)
      res.send(err);
    res.json(pitch);
  });
};

exports.update_status = function(req, res) {
  us.findOneAndUpdate({_id: req.params.pitchId, 'order._id': req.params.orderId}, {$set: {'order.$.status': req.body.status}}, {new: true}, function(err, pitch) {
    if (err)
      res.send(err);
    res.json(pitch);
  });
};