app.factory('postFactory', function($http) {
	var factory = {};

	//add a new post
	factory.add = function(topic, post, callback) {
		$http.post('/topics/' + topic._id, post).then(function(data) {
			// if errors, handle them!
			if (data['data']['errors']) {
				callback(data['data']);
			} else {
				//get all topics to update page
				$http.get('/topics/' + topic._id).then(function(data) {
					callback(data['data']);
				});
			}
		});		
	}

	//add a new comment on a post!!!!
	factory.addComment = function(topic, post, callback) {
		//only add if comment is not empty!
		if (post.newComment) {
			// console.log(post.newComment);
			$http.post('/topics/' + topic._id + '/' + post._id, post).then(function(data) {
				if (data['data']['errors']) {
					callback(data['data']);
				} else {
					//get all topics to update page
					$http.get('/topics/' + topic._id).then(function(data) {
						callback(data['data']);
					});
				}
			});
		}
	}

	//upvote a post!
	factory.upvote = function(topic, post, callback) {
		$http.get('/upvote/' + post._id).then(function(data) {
			if (data['data']['errors']) {
				callback(data['data']);
			} else {
				//get all topics to update page
				$http.get('/topics/' + topic._id).then(function(data) {
					callback(data['data']);
				});
			}
		});
	}

	//downvote a post!
	factory.downvote = function(topic, post, callback) {
		$http.get('/downvote/' + post._id).then(function(data) {
			if (data['data']['errors']) {
				callback(data['data']);
			} else {
				//get all topics to update page
				$http.get('/topics/' + topic._id).then(function(data) {
					callback(data['data']);
				});
			}
		});
	}

	return factory;
});