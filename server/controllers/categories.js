var mongoose = require('mongoose');
var Category = mongoose.model('Category');

module.exports = (function() {
	return {
		//get all categories
		index: function(req, res) {
			Category.find({}).exec(function(err, data) {
				if (err) {
					console.log(err);
				} else {
					res.json(data);
				}
			})
		},

		//add a category
		add: function(req, res) {
			var category = new Category({name: req.params.name});
			category.save(function(err) {
				if (err) {
					console.log(err);
				}
			});
		}

	}
})();