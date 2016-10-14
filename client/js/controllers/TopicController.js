app.controller('TopicController', function($scope, $cookies, $location, $routeParams, topicFactory, postFactory) {

	$scope.username = $cookies.get('username');
	$scope.topic = {};
	$scope.newPost = {};
	// $scope.newComment = {};
	$scope.newPost.user = $scope.username;
	// $scope.newComment.user = $scope.username;

	//check for username cookie, otherwise return to login!
	if ($scope.username == undefined) {
		$location.path('/');
	}

	//callbacks to get data
	function setTopic(data) {
		if (data['errors']) {
			console.log(data['errors']['text']);
			$scope.error = data['errors']['text']['message'];
		} else {
			$scope.error = null;
			$scope.topic = data;
			$scope.newPost = {};
			// $scope.newComment = {};
			$scope.newPost.user = $scope.username;
			// $scope.newComment.user = $scope.username;
			console.log(data);
		}
	}

	//get the data for given topic!
	topicFactory.getTopic($routeParams.topic, setTopic);

	//add a new post for the topic!
	$scope.addPost = function() {
		postFactory.add($scope.topic, $scope.newPost, setTopic);
	}

	//add a new comment for the post!
	$scope.addComment = function(post) {
		post.commentUser = $scope.username;
		postFactory.addComment($scope.topic, post, setTopic);
	}

	//logout
	$scope.logout = function() {
		//remove username from cookies
		$cookies.remove('username');
		$location.path('/')
	}

});