// var myApp = angular.module('myApp', []);

// myApp.controller('AddListItemController', ['$scope', function($scope) {
// 	// $scope.newTask = "something";
// 	$scope.addTask = function(inputTask) {
// 		$scope.newTask = inputTask;		
// 	};
// }]);

var myApp = angular.module('myApp', []);

myApp.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});

myApp.controller('AddListItemController', ['$scope', function($scope) {
	$scope.addTask = function(inputTask) {
		$scope.newTask = inputTask;
	};
}]);