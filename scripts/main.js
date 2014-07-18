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

.controller("TaskListController", ["$scope", "tasks", function($scope, tasks) {
  tasks.$bind($scope, "tasks");

  $scope.addTask = function() {
    /*
     * 1. See https://www.firebase.com/docs/javascript/firebase/setpriority.html
     *    to understand how Firebase orders data by priority
     * 2. See https://www.firebase.com/docs/angular/reference.html#ordered-data-and-arrays
     *    to understand how to use the `orderByPriority` filter so the priority
     *    takes effect in the view HTML
     * 3. See https://docs.angularjs.org/api/ng/service/$q to understand how
     *    the Angular promise system works
     */
    tasks.$add({name: $scope.taskInput}).then(function(ref) {
      ref.setPriority(-new Date().getTime());
    });

    $scope.taskInput = null;
  };
}]);

})(window, window.angular);
