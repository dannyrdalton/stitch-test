app.controller('ProductsCtrl', ['$scope', 'Shopify', '$state', '$stateParams', '$timeout', '$location', function($scope, Shopify, $state, $stateParams, $timeout, $location) {

	// Scope variables
	$scope.products = [];
	$scope.product = {};
	$scope.variant = [];
	$scope.newProduct = {
		images: [{}]
	};
	$scope.newVariants = [];
	$scope.variantList = [];
	$scope.creatingNewProduct = false;

	//loads list of all products
	var loadProducts = function() {
		$scope.productsLoading = true;
		Shopify.getProducts(function(err, products) {
			if (err) {
				$scope.errorMessage = err.message;
			} else {
				$scope.productsLoading = false;
				$scope.products = products;
			}
		});
	};

	//loads a single product
	var loadProduct = function() {
		$scope.productLoading = true;
		$scope.product = Shopify.getCurrentProduct();
		if (isEmpty($scope.product)) {
			var product_id = $location.path().substr(1, $location.path().length - 1);
			Shopify.getProduct(product_id, function(err, product) {
				$scope.product = product;
				$scope.productLoading = false;
				$scope.$emit('product:show', $scope.product);
			});
		} else {
			$scope.productLoading = false;
			$scope.$emit('product:show', $scope.product);
		}
	}

	//Inital loading

	loadProducts();

	if ($location.path() !== '/') loadProduct();


	//Scope functions

	$scope.showProductList = function() {
		$state.transitionTo('product list');
	};

	$scope.showProduct = function(product) {
		Shopify.setCurrentProduct(product);
		loadProduct();
	};

	$scope.createProduct = function(form) {
		form.$invalid = true;
		var variants = [],
			// holds option types
			options = [],
			// holds arrays of option lists
			optionLists = [];

		if ($scope.newVariants.length > 0) {
			$scope.newVariants.forEach(function(variant, vIndex) {
				if (typeof variant.options === 'string') {
					variant.options = variant.options.split(', ');
				}
				optionLists.push(variant.options);
				options.push({
					name: variant.optionName,
					position: vIndex + 1
				});
			});

			variants = combineArrays(optionLists)
			$scope.newProduct.variants = variants;
			$scope.newProduct.options = options;
		}

		$scope.creatingNewProduct = true;

		Shopify.createProduct($scope.newProduct, function(err, product) {
			if (err) {
				$scope.creatingNewProduct = false;
			} else {
				$scope.newProduct = {
					images: [{}]
				};
				$scope.newVariants = [];
				$scope.variantList = [];
				$scope.creatingNewProduct = false;
				$scope.toggleCreateProduct();
			}
		});
	};

	$scope.selectVariant = function(variant, index) {
		$scope.variant = variant;
	};

	$scope.addVariantInput = function() {
		$scope.newVariants.push({});
	};

	$scope.removeVariantInput = function(index) {
		$scope.newVariants.splice(index, 1);
	};

	$scope.isSelected = function(product) {
		return $stateParams.productHandle == product.id;
	};

	//Event handlers

	$scope.$on('products:refresh', function() {
		loadProducts();
	});

	$scope.$on('variants:refresh', function(e, variant) {
		var index = -1;
		$scope.product.variants.forEach(function(v, vIndex) {
			if (v.sku === variant.sku) index = vIndex;
		});
		$scope.product.variants[index] = variant;
		$scope.product.variants[index].saved = true;
		$timeout(function() {
			$scope.product.variants[index].saved = false;
		}, 5000);
	});

	//Helper Functions

	function combineArrays(arraysToCombine) {
	    var divisors = [],
	    	variantNum = 1;

	    for (var i = arraysToCombine.length - 1; i >= 0; i--) {
	       divisors[i] = divisors[i + 1] ? divisors[i + 1] * arraysToCombine[i + 1].length : 1;
	    }

	    function getPermutation(n, arraysToCombine) {
	       var result = {},
	           curArray;    
	       for (var i = 0; i < arraysToCombine.length; i++) {
	          curArray = arraysToCombine[i];
	          result['option' + (i + 1)] = curArray[Math.floor(n / divisors[i]) % curArray.length];
	       }
	       result.sku = $scope.newProduct.sku + '-' + variantNum;
	       result.inventory_management = 'shopify';
	       variantNum++;
	       return result;
	    }

	    var numPerms = arraysToCombine[0].length;
	    for(var i = 1; i < arraysToCombine.length; i++) {
	        numPerms *= arraysToCombine[i].length;
	    }

	    var combinations = [];
	    for(var i = 0; i < numPerms; i++) {
	        combinations.push(getPermutation(i, arraysToCombine));
	    }
	    return combinations;
	}

	function isEmpty(obj) {
	    for (var prop in obj) {
	        if (obj.hasOwnProperty(prop))
	            return false;
	    }

	    return true;
	}
}]);