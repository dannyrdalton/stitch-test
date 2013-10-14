app.controller('AppCtrl', ['$scope', '$state', function($scope, $state) {

	$scope.currentRoute = '/';

	$scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
	});
}]);