app.factory('userFactory', function($http) {
	var factory = {};

	//add new user
	factory.add = function(user, callback) {
		$http.put('/users/' + user.name).then(function(data) {
			callback(data);
		});
	}

	return factory;
});