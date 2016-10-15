app.factory('userFactory', function($http) {
	var factory = {};

	//add new user
	factory.add = function(user, callback) {
		$http.put('/users/' + user.name).then(function(data) {
			callback(data);
		});
	}

	//get a specific user
	factory.getById = function(id, callback) {
		$http.get('/users/' + id).then(function(data) {
			callback(data['data']);
		});
	}

	return factory;
});