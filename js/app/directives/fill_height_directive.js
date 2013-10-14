app.directive('fillHeight', ['$window', function($window) {
	return {
		restrict: 'A',
    	link: function($scope, elem, attrs) {
    		$scope.height = $window.innerHeight;
      		angular.element($window).bind('resize', function() {
        		$scope.height = $window.innerHeight;
        		$scope.$apply('height');
        	});

        	$scope.$watch('height', function(newVal, oldVal) {
         		elem.height($scope.height - elem.offset().top);
        	});
        }
    };
}]);