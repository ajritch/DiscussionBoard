app.factory('dashboardFactory', function($http) {
	var factory = {};

	factory.getCategories = function(callback) {
		$http.get('/categories').then(function(data) {
			callback(data['data']);
		});
	}

	return factory;
});