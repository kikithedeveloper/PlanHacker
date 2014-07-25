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

myApp.factory("labels", ["user", function(user) {
  return user.$child("labels");
}]);

myApp.factory("data", function() {
  return {taskInput:"data binding"};
});

myApp.controller("TaskListController", ["$scope", "$filter", "$firebase", "tasks",
  function($scope, $filter, $firebase, tasks, data) {

  tasks.$bind($scope, "tasks");

  $scope.addTask = function() {
    tasks.$add({name: $scope.taskInput, isComplete: false, course: null, label: null, dueDate: null, reminder: null, note: null}).then(function(ref) {
      ref.setPriority(-new Date().getTime());
    });
    $scope.taskInput = null;
  };

  $scope.showLabel = true;

}]);

myApp.controller("LabelController", ["$firebase", "$scope", "$filter", "labels", "tasks",
  function($firebase, $scope, $filter, labels, tasks) {

  labels.$bind($scope, "labels");

  $scope.addLabel = function(task) {
    labels.$add({label: $scope.labelInput});
    console.log("successful execution for addLabel()");
  };

  $scope.assignLabel = function(id, lblString) {
    var itemRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + id);
    $firebase(itemRef).$update({
      label: lblString,
    });
    console.log("successful execution for assignLabel()");
  };

  $scope.removeLabel = function(id) {
    var itemRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + id);
    // $firebase(itemRef).label.$remove();

    $firebase(itemRef).$update({
      label: null,
    });
    console.log("successful execution for removeLabel()");
  };

}]);

myApp.controller("SideBarController", ["$firebase", "$scope", "tasks", "labels", "data",
  function($firebase, $scope, tasks, labels, data) {

  // tasks.$bind($scope, "tasks");
  // labels.$bind($scope, "labels");

  $scope.renameTask = function(id, taskname) {
    var itemRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + id);

    $firebase(itemRef).$update({
      name: taskname,
    });

    console.log("successful execution for renameTask()");
  };

  $scope.addNote = function(id, noteInput) {
    var itemRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + id);

    $firebase(itemRef).$update({
      note: noteInput,
    });

    console.log("successful execution for addNote()");
  };

}]);