'use strict';
var mongoose = require('mongoose'),
  us = mongoose.model('User');

exports.login = function(req, res) {
  us.find({username: req.body.username, password: req.body.password}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
    console.log(user.length);
  });
};

exports.loginfb = function(req, res) {
  us.find({fbid: req.body.fbid}, function(err, user) {
    if (err)
      res.send(err);
    console.log(user.length);
    if (user.length == 1) {
      res.json(user);
    } else {
      var new_user = new us(req.body);
      new_user.save(function(err, n_user){
        if (err)
          res.send(err);
        res.json(n_user);
      });
    }
    
  });
};

exports.list_all_users = function(req, res) {
  us.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.edit_user = function(req, res) {
  us.findOneAndUpdate({_id: req.params.userId}, 
    {$set: {name: req.body.name, phone: req.body.phone}}, 
    {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.change_password = function(req, res) {
  us.findOneAndUpdate({_id: req.params.userId}, 
    {$set: {password: req.body.password}}, 
    {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.register = function(req, res) {
  us.count({username: req.body.username}, function(err, c){
    if (err)
      res.send(err);
    if (c == 0) {
      var new_user = new us(req.body);
      new_user.save(function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });
    } else {
      res.json({existed: true});
    }
  })
};


exports.get_an_user = function(req, res) {
  us.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.update_an_user = function(req, res) {
  us.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_an_user = function(req, res) {


  us.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

exports.like = function(req, res) {
  us.findOneAndUpdate({'_id': req.params.userId}, {$push: {like: req.params.groundId}}, {new: true}, function(err, pitch) {
    if (err)
      res.send(err);
    res.json(pitch.like);
  });
};

exports.unlike = function(req, res) {
  us.findOneAndUpdate({'_id': req.params.userId}, {$pull: {like: req.params.groundId}}, {new: true}, function(err, pitch) {
    if (err)
      res.send(err);
    res.json(pitch.like);
  });
};