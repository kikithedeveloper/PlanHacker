angular.module('plan4me', [])
.controller('AddListItemController', ['$scope', function($scope) {
	$scope.addTask = function() {
		$scope.newTask = $scope.inputTask;
	};
}]);
