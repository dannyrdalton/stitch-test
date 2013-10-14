app.controller('AppCtrl', ['$scope', '$state', function($scope, $state) {

	$scope.currentRoute = '/';
	$scope.showAddProductBtn = true;
	$scope.showCreateProduct = false;

	$scope.toggleCreateProduct = function() {
		$scope.showCreateProduct =  !$scope.showCreateProduct;
	};

	$scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
		if (toState.name === 'product list') {
			$scope.showAddProductBtn = true;
			$scope.currentRoute = '/'
			$scope.currentRouteText = 'Home';
		} else {
			$scope.showAddProductBtn = false;
			$scope.currentRoute = '/' + toParams.productHandle
		}
	});

	$scope.$on('product:show', function(e, product) {
		$scope.product = product;
		$scope.currentRouteText = 'Home -> ' + product.title
	});
}]);