var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

module.exports = (function() {
	return {
		//get all topics
		index: function(req, res) {
			Topic.find({}).populate('category user posts').exec(function(err, data) {
				if (err) {
					console.log(err);
				} else {
					res.json(data);
				}
			})
		},

		//show a particular topic
		show: function(req, res) {
			var query = [{path: 'category'}, {path: 'user'}, {path: 'posts', populate: [{path: 'user topic'}, {path: 'comments', populate: {path: 'user'}}]}];
			Topic.findOne({_id: req.params.id}).populate(query).exec(function(err, data) {
				if (err) {
					console.log(err);
				} else {
					res.json(data);
				}
			});
		},

		//add a topic
		create: function(req, res) {
			//define the user!
			User.findOne({name: req.body.user}).exec(function(err, user) {
				if (err) {
					// console.log(err);
					res.json(err);
				} else if (user) {
					// console.log(user);
					var topic = new Topic({name: req.body.name, description: req.body.description, category: req.body.category, user: user._id});
					// console.log(topic);
					topic.save(function(err) {
						if (err) {
							// console.log(err);
							res.json(err);
						} else {
							//add topic to list of user's topics
							user.topics.push(topic);
							user.save(function(err) {
								if (err) {
									res.json(err);
								} else {
									res.json({'saved': true});
								}
							});
						}
					});
				}
				
			});
		}


	}
})();