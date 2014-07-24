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

myApp.controller("TaskListController", ["$scope", "$filter", "$firebase", "tasks", "labels", "data",
  function($scope, $filter, $firebase, tasks, labels, data) {

  // $scope.data = data;

  tasks.$bind($scope, "tasks");
  labels.$bind($scope, "labels");

  $scope.addTask = function() {
    tasks.$add({name: $scope.taskInput, isComplete: false, label: "", dueDate: "", reminder: "", note: ""}).then(function(ref) {
      ref.setPriority(-new Date().getTime());
    });
    $scope.taskInput = null;
  };

  $scope.showLabel = true;

}]);

myApp.controller("LabelController", ["$firebase", "$scope", "$filter", "labels", "tasks",
  function($firebase, $scope, $filter, labels, tasks) {

  tasks.$bind($scope, "tasks");
  labels.$bind($scope, "labels");

  $scope.addLabel = function(task) {
    labels.$add({label: $scope.labelInput});
  };

  $scope.assignLabel = function(id, lblString) {
    var itemRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + id);
    $firebase(itemRef).$update({
      label: lblString,
    });
  };

}]);

myApp.controller("SideBarController", ["$firebase", "$scope", "tasks", "labels", "data",
  function($firebase, $scope, tasks, labels, data) {

  tasks.$bind($scope, "tasks");
  labels.$bind($scope, "labels");

  $scope.renameTask = function(id, taskname) {
    var itemRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + id);

    $firebase(itemRef).$update({
      name: taskname,
    });

    console.log("successful change");
  };

  $scope.addNote = function(id, noteInput) {
    var itemRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + id);

    $firebase(itemRef).$update({
      note: noteInput,
    });

    console.log("successful execution for addNote()");
  };


  // $scope.addDueDate = function(id, date) {
  //   var itemRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + id);

  //   $firebase(itemRef).$update({

  //   })
  // };

    // $scope.data = data;
}]);


// A way to update an attribute in a Firebase instance...
  // $scope.completeTask = function(id) {
  //   var itemRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + id);
  //   $firebase(itemRef).$update({
  //     isComplete: true,
  //   });
  // };