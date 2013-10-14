app.factory('Shopify', ['$rootScope', '$http', function($rootScope, $http) {
	var API_KEY = 'ddd3e76597031bfcea522a779b3f8b87',
		PASSWORD = 'c25b400b1a8194c60797340aab69e607',
		SHARED_SECRET = '4f45591a1ebf5d89e9722b4d54d69493',
		STORE_URL = 'https://dannys-stop.myshopify.com',
		CORS_PROXY = 'http://www.crshman.info/cors-proxy.php?url=',
		BASE_URL = CORS_PROXY + 'https://' + API_KEY + ':' + PASSWORD + '@dannys-stop.myshopify.com/admin';

	var products = [],
		currentProduct = {};

	return {
		getStoreUrl: function() {
			return STORE_URL;
		},
		setCurrentProduct: function(product) {
			currentProduct = product;
		},
		getCurrentProduct: function() {
			return currentProduct;
		},
		getProducts: function(callback) {
			var reqUrl = BASE_URL + '/products.json';
			$http.get(reqUrl)
			.success(function(data) {
				products =  data.contents.products;
				callback(null, products);
			})
			.error(function(data, status, headers, config) {
				error = { message: 'Could not retrieve products.' };
				callback(error, null);
			});
		},
		getProduct: function(product_id, callback) {
			var reqUrl = BASE_URL + '/products/' + product_id + '.json';

			$http.get(reqUrl)
			.success(function(data) {
				currentProduct = data.contents.product;
				callback(null, data.contents.product);
			});
		},
		createProduct: function(productToCreate, callback) {
			var reqUrl = BASE_URL + '/products.json',
				variantsToCreate = [];

			$http.post(reqUrl, {
				product: productToCreate
			})
			.success(function(data) {
				$rootScope.$broadcast('products:refresh');
				callback(null, data.contents.product);
			});
		},
		updateVariant: function(variantToUpdate, callback) {
			var reqUrl = BASE_URL + '/variants/' + variantToUpdate.id + '.json';
			$http.put(reqUrl, {
				variant: {
					id: variantToUpdate.id,
					inventory_quantity: variantToUpdate.inventory_quantity
				}
			})
			.success(function(data) {
				callback(null, data.contents.variant);
			});
		}
	};
}]);