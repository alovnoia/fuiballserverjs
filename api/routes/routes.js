'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');
  var cityStuff = require('../controllers/CityController');

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
	
// City routes -------------------------------------------------------------------------

  app.route('/city')
    .get(cityStuff.list_all_city)
    .post(cityStuff.add_city);

  app.route('/city/:cityId')
    .get(cityStuff.get_a_city)
    .put(cityStuff.update_a_city)
    .delete(cityStuff.delete_a_city);
};
