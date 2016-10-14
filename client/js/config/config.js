var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'static/partials/login.html'
		})
        .when('/dashboard', {
            templateUrl: 'static/partials/dashboard.html'
        })
        .when('/topic/:topic', {
            templateUrl: 'static/partials/topic.html'
        })
        .when('/user/:user', {
            templateUrl: 'static/partials/user.html'
        })
		.otherwise({
			redirectTo: '/'
		});
});

//range filter to display lots of options
app.filter('range', function() {
  return function(input, start, end) {    
    start = parseInt(start);
    end = parseInt(end);
    var direction = (start <= end) ? 1 : -1;
    while (start != end) {
        input.push(start);
        start += direction;
    }
    return input;
  };
});