'use strict';


var mongoose = require('mongoose'),
  us = mongoose.model('Ground');

exports.get_grounds_with_condition = function(req, res) {
  if (req.body.area == '--') {
    us.find({city: req.body.city}, function(err, ground) {
      if (err)
        res.send(err);
      res.json(ground);
    });
  } else {
    us.find({city: req.body.city, area: req.body.area}, function(err, ground) {
    if (err)
        res.send(err);
      res.json(ground);
    });
  }
};

exports.list_all_grounds = function(req, res) {
  us.find({}, function(err, ground) {
    if (err)
      res.send(err);
    res.json(ground);
  });
};


exports.add_ground = function(req, res) {
    var new_ground = new us(
    {
      "owner": req.body.owner,
      "address": req.body.address,
      "name": req.body.name,
      "phone": req.body.phone,
      "area": req.body.area,
      "city": req.body.city,
      "ground_type": req.body.ground_type,
      "desc": req.body.desc,
      "deleted": false,
      "location": [
        {"lat": req.body.lat,"long": req.body.long}
      ]
    });
    new_ground.save(function(err, ground) {
      if (err)
        res.send(err);
      res.json(ground);
    });
};


exports.get_a_ground = function(req, res) {
  us.findById(req.params.groundId, function(err, ground) {
    if (err)
      res.send(err);
    res.json(ground);
  });
};


exports.update_a_ground = function(req, res) {
  us.findOneAndUpdate({_id: req.params.groundId}, 
    {$set:
      {name:req.body.name,
      address: req.body.address,
      name: req.body.name,
      phone: req.body.phone,
      area: req.body.area,
      city: req.body.city,
      ground_type: req.body.ground_type,
      location: [
        {lat: req.body.lat,long: req.body.long}
      ]
    }},
   {new: true}, function(err, ground) {
    if (err)
      res.send(err);
    res.json(ground);
  });
};

exports.remove_pitch_from_ground = function(req, res) {
  us.findOneAndUpdate({_id: req.params.groundId}, 
    {$pull: {menu: {pitch_id: req.params.pitchId}}},
   {new: true}, function(err, ground) {
    if (err)
      res.send(err);
    res.json(ground);
  });
};


exports.delete_a_ground = function(req, res) {

  us.remove({
    _id: req.params.groundId
  }, function(err, ground) {
    if (err)
      res.send(err);
    res.json({ message: 'Ground successfully deleted' });
  });
};

exports.favorite_ground = function(req, res) {
  us.find({'_id': {$in: req.body.lst_ground.split(",")}}, function(err, ground) {
    if (err)
      res.send(err);
    res.json(ground);
  });
};

exports.ground_owner = function(req, res) {
  us.find({'owner': req.params.user_id}, function(err, ground) {
    if (err)
      res.send(err);
    if (ground.length == 0) {
      res.send(true);
    } else {
      res.json(ground);
    }
  });
};

exports.get_ground_by_owner = function(req, res) {
  us.find({'_id': req.params.user_id}, function(err, ground) {
    if (err)
      res.send(err);
    res.json(ground);
  });
};

exports.add_service = function(req, res) {
  us.findOneAndUpdate({'_id': req.params.groundId}, {$push: 
    {
      service: {name: req.body.name,price: req.body.price}
    }}, 
    {new: true}, function(err, ground) {
    if (err)
      res.send(err);
    res.json(ground);
  });
};

exports.delete_service = function(req, res) {
  us.findOneAndUpdate({'_id': req.params.groundId}, {$pull: 
    {
      service: {_id: req.body.serviceId}
    }}, 
    {new: true}, function(err, ground) {
    if (err)
      res.send(err);
    res.json(ground);
  });
};