app.factory('topicFactory', function($http) {
	var factory = {};

	factory.add = function(topic, callback) {
		$http.post('/topics', topic).then(function(data) {
			//if errors, act accordingly
			if (data['data']['errors']) {
				callback(data['data']);
			} else {
				//get all topics
				factory.getTopics(callback);
			}
			
		});
	}

	factory.getTopics = function(callback) {
		$http.get('/topics').then(function(data) {
			callback(data['data']);
		});
	}

	//show particular topic!
	factory.getTopic = function(id, callback) {
		$http.get('/topics/' + id).then(function(data) {
			callback(data['data']);
		});
	}

	return factory;
});