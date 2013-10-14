app.controller('ProductShowCtrl', ['$scope', 'Shopify', '$state', function($scope, Shopify, $state) {
	$scope.name = 'BLOOBY DOBY BOOBL';
	$scope.product = Shopify.getCurrentProduct();
	console.log($scope.product);
	
	$scope.$on('products', function(e, product) {
		console.log('ewewewewew');
	});
}]);