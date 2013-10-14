app.controller('AppCtrl', ['$scope', function($scope) {

	$scope.currentRoute = '/';

	$scope.$on('routeChangeSuccess', function(prev, current) {
	});
}]);