app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	return $stateProvider.state('product list', {
		url: '/',
		views: {
			"": {
				controller: 'ProductListCtrl',
				templateUrl: '/views/partials/products/list.html'
			}
		}
	}).state('product show', {
		url: '/:productHandle',
		views: {
			"": {
				controller: 'ProductShowCtrl',
				templateUrl: '/views/partials/products/show.html'
			}
		}
	});
}]);