app.factory('Shopify', ['$rootScope', '$http', function($rootScope, $http) {
	var API_KEY = 'ddd3e76597031bfcea522a779b3f8b87',
		PASSWORD = 'c25b400b1a8194c60797340aab69e607',
		SHARED_SECRET = '4f45591a1ebf5d89e9722b4d54d69493',
		CORS_PROXY = 'http://www.crshman.info/cors-proxy.php?url=',
		BASE_URL = CORS_PROXY + 'https://' + API_KEY + ':' + PASSWORD + '@dannys-stop.myshopify.com/admin';

	return {
		getProducts: function() {
			var reqUrl = BASE_URL + '/products.json';
			return $http.get(reqUrl);
		}
	};
}]);