(function(window, angular, undefined) {

"use strict";

angular.module('plan4me', ['ngResource'])
//.factory('Task', ['$resource', function($resource) {
//	Code goes here to connect to firebase
//}])
//.controller('AddListItemController', ['$scope', 'Task', function($scope, Task) {
.controller('AddListItemController', ['$scope', function($scope) {
	$scope.addTask = function() {
		$scope.newTask = $scope.inputTask;
	};
}]);

})(window, window.angular);