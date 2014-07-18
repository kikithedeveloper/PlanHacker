(function(window, angular, undefined) {

"use strict";

// baseRef - starting point "/"
angular.module('planhacker', ['firebase'])
.factory("baseRef", ["$firebase", function($firebase) {
    var ref = new Firebase("https://planhacker.firebaseio.com/");
    return $firebase(ref);
}])
// userRed - "/users"
.factory("users", ["baseRef", function(baseRef) {
    return baseRef.$child('users');
}])
// user_ID - "/users/user_id"
.factory("user", ["users", function(users) {
    return userRef.$child('user');
}])
// taskRef - "/users/user_id/tasks"
.factory("tasks", ["user", function(user) {
    return user_ID.$child('tasks');
}])
.controller("TaskListController", ["$scope", "tasks", function($scope, tasks) {
    $scope.tasks = tasks;

    $scope.addTask = function() {
        $scope.tasks.$add({name:$scope.inputTask});
        $scope.inputTask = null;
    };

    $scope.toggleComplete = function(key, task) {
        var taskRef = tasks.$child(key);
        taskRef.$update({isComplete: task.isComplete});
    };

    $scope.deleteTask = function(key) {
        $scope.tasks.$remove(key);
    };
}])

})(window, window.angular);
