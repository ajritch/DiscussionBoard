//server API routing
var users = require('./../controllers/users.js');
var categories = require('./../controllers/categories.js');
var topics = require('./../controllers/topics.js');
var posts = require('./../controllers/posts.js');

module.exports = function(app) {

	//add a user
	app.put('/users/:name', function(req, res) {
		users.create(req, res);
	});

	//get all categories
	app.get('/categories', function(req, res) {
		categories.index(req, res);
	});

	//add a category
	app.get('/categories/:name', function(req, res) {
		categories.add(req, res);
	});

	//get all topics
	app.get('/topics', function(req, res) {
		topics.index(req, res);
	});

	//get a particular topic
	app.get('/topics/:id', function(req, res) {
		topics.show(req, res);
	});

	//add a topic
	app.post('/topics', function(req, res) {
		topics.create(req, res);
	});

	//add a post to a topic
	app.post('/topics/:id', function(req, res) {
		posts.create(req, res);
	});

	//add a comment to a post on a topic
	//I could make this more modularized by using a comments controller....
	app.post('/topics/:topicID/:postID', function(req, res) {
		posts.addComment(req, res);
	});


}