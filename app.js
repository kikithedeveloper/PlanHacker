var myApp = angular.module('myApp', []);

myApp.controller('AddListItemController', ['$scope', function($scope) {
	$scope.addTask = function() {
		$scope.newTask = $scope.inputTask;
	};
}]);
