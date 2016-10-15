app.controller('PersonController', function($scope, $cookies, $location, $routeParams, userFactory) {

	$scope.username = $cookies.get('username');
	$scope.user = {}

	//check for username cookie, otherwise return to login!
	if ($scope.username == undefined) {
		$location.path('/');
	}

	//callback to set the user info!
	function setUser(data) {
		if (data['errors']) {
			console.log(data['errors']['text']);
		} else {
			$scope.user = data;
			console.log(data);
		}
	}

	//get the user's information
	userFactory.getById($routeParams.user, setUser); 

	//logout
	$scope.logout = function() {
		//remove username from cookies
		$cookies.remove('username');
		$location.path('/')
	}

});