var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
	return {
		//add new user
		create: function(req, res) {
			User.findOne({name: req.params.name}).exec(function(err, user) {
				if (err) {
					console.log(err);
				} else if (!user) {
					//no user with that name? add to db
					var newUser = new User({name: req.params.name});
					newUser.save(function(err) {
						if (err) {
							res.json(err);
						} else {
							res.json({'saved': true})
						}
					});
				} else {
					res.json({'userfound': true})
				}
			});
		}
	}
})();