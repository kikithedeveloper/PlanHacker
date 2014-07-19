(function(window, angular, undefined) {

"use strict";

angular.module("planhacker", ["firebase"])

.factory("baseRef", ["$firebase", function($firebase) {
  return $firebase(new Firebase("https://planhacker.firebaseio.com"));
}])

.factory("users", ["baseRef", function(baseRef) {
  return baseRef.$child("users");
}])

.factory("user", ["users", function(users) {
  return users.$child("user");
}])

.factory("tasks", ["user", function(user) {
  return user.$child("tasks");
}])

.factory("completedTasks", ["user", function(user) {
  return user.$child("completedTasks");
}])

.controller("TaskListController", [
  "$scope", "$filter", "tasks", "completedTasks",
  function($scope, $filter, tasks, completedTasks) {

  tasks.$bind($scope, "tasks");
  completedTasks.$bind($scope, "completedTasks");

  $scope.addTask = function() {
    var promise = tasks.$add({name: $scope.taskInput, isComplete: false});
    promise.then(function(ref) {
      ref.setPriority(-new Date().getTime());
    });

    $scope.taskInput = null;
  };

  $scope.completeTask = function(task) {
    completedTasks.$add({name: task.name, isComplete: true});
    tasks.$remove(task.$id);
  }

  $scope.incompleteTask = function(task) {
    tasks.$add({name: task.name, isComplete: false});
    completedTasks.$remove(task.$id);
  }

}]);

})(window, window.angular);