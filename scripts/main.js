(function(window, angular, undefined) {

"use strict";

angular.module('plan4me', [])
.controller('AddListItemController', ['$scope', function($scope) {
	$scope.addTask = function() {
		$scope.newTask = $scope.inputTask;
	};
}]);

})(window, window.angular);
