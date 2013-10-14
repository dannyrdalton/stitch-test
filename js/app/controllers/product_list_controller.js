app.controller('ProductListCtrl', ['$scope', 'Shopify', '$state', function($scope, Shopify, $state) {
	$scope.products = {};

	var loadProducts = function() {
		Shopify.getProducts()
		.success(function(data) {
			$scope.products = data.contents.products;
			console.log($scope.products);
		});
	};

	loadProducts();

	$scope.showProduct = function(product) {
		Shopify.setCurrentProduct(product);
	};
}]);