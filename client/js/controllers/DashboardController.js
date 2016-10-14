app.controller('DashboardController', function($scope, $cookies, $location, dashboardFactory, topicFactory) {

	$scope.username = $cookies.get('username');
	$scope.categories = [];
	$scope.topics = [];
	$scope.newTopic = {};
	$scope.newTopic.user = $scope.username;

	//check for username cookie, otherwise return to login!
	if ($scope.username == undefined) {
		$location.path('/');
	}

	//callbacks to get data
	function setCategories(data) {
		$scope.categories = data;
	}
	function setTopics(data) {
		$scope.errors = [];
		if (data['errors']) {
			for (var i in data['errors']) {
				$scope.errors.push(data['errors'][i].message);
			}
			// console.log($scope.errors);
		} else {	
			$scope.topics = data;
			$scope.newTopic = {};
			$scope.newTopic.user = $scope.username;
		}
	}

	//set data
	dashboardFactory.getCategories(setCategories);
	topicFactory.getTopics(setTopics);

	//add new topic
	$scope.addTopic = function() {
		topicFactory.add($scope.newTopic, setTopics);
	}

	//show page for particular topic
	$scope.show = function(topic) {
		$location.path('/topic/' + topic._id);
	}

	//logout
	$scope.logout = function() {
		//remove username from cookies
		$cookies.remove('username');
		$location.path('/')
	}

});