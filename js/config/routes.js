app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	return $stateProvider.state('product list', {
		url: '/',
		views: {
			"": {
				templateUrl: '/views/partials/products/list.html'
			}
		}
	}).state('product show', {
		url: '/:productHandle',
		views: {
			"": {
				templateUrl: '/views/partials/products/show.html'
			}
		}
	});
}]);