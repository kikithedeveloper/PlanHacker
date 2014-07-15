(function(window, angular, undefined) {

"use strict";

angular.module("plan4me", ["firebase"])
.value("baseRef", new Firebase("https://blazing-fire-2043.firebaseio.com"))
.factory("tasks", taskFactory)
.controller("AddListItemController", AddListItemController);

function taskFactory($firebase, baseRef) {
  return $firebase(baseRef.child("tasks"));
}
taskFactory.$inject = ["$firebase", "baseRef"];

function AddListItemController($scope, tasks) {
  $scope.tasks = tasks;
  $scope.addTask = function() {
    tasks.$add({name: $scope.taskInput});
  };
}
AddListItemController.$inject = ["$scope", "tasks"];

})(window, window.angular);
