'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');
  //var userStuff = require('../controllers/UserController');
  var groundStuff = require('../controllers/GroundController');
  var cityStuff = require('../controllers/CityController');
  //var pitchStuff = require('../controllers/PitchController');

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
	
// Pitch routes ------------------------------------------------------------------------

  app.route('/pitch/add_pitch_to_ground/:groundId')
    .post(pitchStuff.add_pitch_to_ground);

  app.route('/pitch/update_status/:pitchId/:orderId')
    .post(pitchStuff.update_status);

  app.route('/pitch/order/:pitchId/')
    .post(pitchStuff.order);

  app.route('/pitch/order/:pitchId/:date')
    .get(pitchStuff.get_order_by_date);

  app.route('/pitch/inground')
    .post(pitchStuff.get_pitch_in_ground);

  app.route('/pitch')
    .get(pitchStuff.list_all_pitch)
    .post(pitchStuff.add_pitch);

  app.route('/pitch/:pitchId')
    .get(pitchStuff.get_a_pitch)
    .put(pitchStuff.update_a_pitch)
    .delete(pitchStuff.delete_a_pitch);

  // City routes -------------------------------------------------------------------------

  app.route('/city')
    .get(cityStuff.list_all_city)
    .post(cityStuff.add_city);

  app.route('/city/:cityId')
    .get(cityStuff.get_a_city)
    .put(cityStuff.update_a_city)
    .delete(cityStuff.delete_a_city);

  // Ground routes------------------------------------------------------------------------

  app.route('/ground/remove_pitch_from_ground/:groundId/:pitchId')
    .post(groundStuff.remove_pitch_from_ground);

  app.route('/ground/delete_service/:groundId')
    .post(groundStuff.delete_service);

  app.route('/ground/add_service/:groundId')
    .post(groundStuff.add_service);

  app.route('/ground/get_ground/:user_id')
    .get(groundStuff.get_ground_by_owner);

  app.route('/ground/owner/:user_id')
    .get(groundStuff.ground_owner);

  app.route('/ground/like')
    .post(groundStuff.favorite_ground);

  app.route('/ground/condition')
    .post(groundStuff.get_grounds_with_condition);

  app.route('/ground')
    .get(groundStuff.list_all_grounds)
    .post(groundStuff.add_ground);


  app.route('/ground/:groundId')
    .get(groundStuff.get_a_ground)
    .post(groundStuff.update_a_ground)
    .delete(groundStuff.delete_a_ground);

  // user Routes---------------------------------------------------------------------------

  app.route('/user/order/:userId')
    .post(userStuff.order);

  app.route('/user/change_password/:userId')
    .post(userStuff.change_password);

  app.route('/user/edit/:userId')
    .post(userStuff.edit_user);

  app.route('/user/login')
    .post(userStuff.login);

  app.route('/user/loginfb')
    .post(userStuff.loginfb);

  app.route('/user/like/:userId/:groundId')
    .post(userStuff.like);

  app.route('/user/unlike/:userId/:groundId')
    .post(userStuff.unlike);

  app.route('/user')
    .get(userStuff.list_all_users)
    .post(userStuff.register);


  app.route('/user/:userId')
    .get(userStuff.get_an_user)
    .put(userStuff.update_an_user)
    .delete(userStuff.delete_an_user);

    app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
};
