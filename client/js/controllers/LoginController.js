app.controller('LoginController', function($scope, $cookies, $location, userFactory) {
	$scope.newUser = {};

	function resetUser(data) {
		//error checking
		// console.log(data);
		$scope.errors = [];
		if (data['data']['errors']) {
			console.log('sad');
			for (var i in data['data']['errors']) {
				$scope.errors.push(data['data']['errors'][i].message);
			}
			console.log($scope.errors);
		} else {	
			$cookies.put('username', $scope.newUser.name);
			$scope.newUser = {};
			$location.path('/dashboard');
		}
	}

	$scope.add = function() {
		userFactory.add($scope.newUser, resetUser);
	}
});