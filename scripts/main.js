// I am using main2.js from now on. Because there's something in here that doesn't work well with index.html file. So I had to do something different and it worked with main2.js because I changed the setting with Angular JS.

(function(window, angular, undefined) {

"use strict";

angular.module("planhacker", ["firebase", "ui.bootstrap"])

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

.factory("labels", ["user", function(user) {
  return user.$child("labels");
}])

// I don't think I need this factory... 
// .factory("label", ["tasks", function(tasks) {
//   return tasks.$child("label");
// }])

.controller("TaskListController", [
  "$scope", "$filter", "tasks", "completedTasks", "labels",
  function($scope, $filter, tasks, completedTasks, labels) {

  tasks.$bind($scope, "tasks");
  completedTasks.$bind($scope, "completedTasks");

  $scope.addTask = function() {
    tasks.$add({name: $scope.taskInput, isComplete: false}).then(function(ref) {
      ref.setPriority(-new Date().getTime());
    });
    $scope.taskInput = null;
  };

  $scope.completeTask = function(task) {
    completedTasks.$add({name: task.name, isComplete: true});
    tasks.$remove(task.$id);
  };

  $scope.incompleteTask = function(task) {
    tasks.$add({name: task.name, isComplete: false});
    completedTasks.$remove(task.$id);
  };

  $scope.showLabel = false;

}])

.controller("LabelController", ["$scope", "$filter", "labels", "tasks",
  function($scope, $filter, labels, tasks) {

  labels.$bind($scope, "labels");

  $scope.addLabel = function(task) {
    labels.$add({label: $scope.labelInput});
  };

  $scope.assignLabel = function(item) {
    tasks.$update({label: item.label});
    // Struggling with this right now. I am trying to add an attribute to a task in "tasks" URL
    // I tried $add and $update. They don't work the way I want it...
  };

  $scope.printHello = function() {
    console.log("Hello!");
  };

}]);

})(window, window.angular);