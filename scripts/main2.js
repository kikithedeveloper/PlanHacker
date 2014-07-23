var myApp = angular.module("planhacker", ["firebase", "ui.bootstrap"]);

myApp.constant("FIREBASE_URL", "https://planhacker.firebaseio.com/");

myApp.factory("baseRef", ["$firebase", function($firebase) {
  return $firebase(new Firebase("https://planhacker.firebaseio.com"));
}]);

myApp.factory("users", ["baseRef", function(baseRef) {
  return baseRef.$child("users");
}]);

myApp.factory("user", ["users", function(users) {
  return users.$child("user");
}]);

myApp.factory("tasks", ["user", function(user) {
  return user.$child("tasks");
}]);

myApp.controller("TaskListController", ["$scope", "$filter", "$firebase", "tasks",
  function($scope, $filter, $firebase, tasks) {
  console.log("TaskListController $firebase = " + $firebase);
  tasks.$bind($scope, "tasks");
  // completedTasks.$bind($scope, "completedTasks");

  $scope.addTask = function() {
    tasks.$add({name: $scope.taskInput, isComplete: false, tag: "", dueDate: "", reminder: ""}).then(function(ref) {
      ref.setPriority(-new Date().getTime());
    });
    $scope.taskInput = null;
  };


  $scope.completeTask = function(id) {
    var itemRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + id);
    $firebase(itemRef).$update({
      isComplete: true,
    });
  };

  $scope.showLabel = true;

}]);