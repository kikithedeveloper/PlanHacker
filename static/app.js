var myApp = angular.module('myApp', []);

myApp.controller('AddListItemController', ['$scope', function($scope) {
	// $scope.newTask = "something";
	$scope.addTask = function(inputTask) {
		$scope.newTask = inputTask;		
	};
}]);