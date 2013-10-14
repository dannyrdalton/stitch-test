app.controller('ProductListCtrl', ['$scope', 'Shopify', function($scope, Shopify) {
	$scope.products = {};

	var loadProducts = function() {
		Shopify.getProducts()
		.success(function(data) {
			$scope.products = data.contents.products;
			console.log($scope.products);
		});
	};

	loadProducts();
}]);