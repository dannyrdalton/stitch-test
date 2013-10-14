app.directive('updateQuantity', ['$rootScope', '$http', 'Shopify', function($rootScope, $http, Shopify) {
	return {
		restrict: 'A',
		link: function($scope, $elem, $attrs) {
			$elem.on('focusout', function(e) {
				Shopify.updateVariant($scope.variant, function(err, variant) {
					$scope.variant = variant;
					$rootScope.$broadcast('products:refresh');
					$rootScope.$broadcast('variants:refresh', variant);
				});
			});
		}
	};
}]);