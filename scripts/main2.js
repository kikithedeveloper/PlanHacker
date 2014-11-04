// GLOBAL VARIABLES

var ref = new Firebase("https://planhacker.firebaseio.com/users/user/");


var myApp = angular.module("planhacker", ["firebase", "ui.bootstrap", 'ngRoute', 'ngAnimate']);


myApp.config(function($routeProvider) {

  $routeProvider

  .when('/', {
    redirectTo: "/login"
  })
      // login
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'loginController'
      })
      // task home page
      .when('/plan', {
        templateUrl: 'plan.html',
        controller: 'TaskListController'
      });

    });

// Controller for login
myApp.controller('loginController', function($scope, $firebase) {
  // will be continued
});

myApp.controller("CalendarCtrl", function($scope) { 

});

myApp.controller("TaskListController", function($scope, $firebase) {

  var taskSync = $firebase(ref.child("tasks"));
  var tasks = taskSync.$asArray();

    $scope.tasks = tasks; // note: this is for the ng-repeat {{ task in tasks }}

    // tasks.$bind($scope, "tasks");

    $scope.addTask = function() {

      tasks.$add({
        name: $scope.taskInput, 
        isComplete: false, 
        course: null, 
        label: null, 
        dueDate: null, 
        reminder: null, 
        note: null
      })
      .then(function(ref) {
        ref.setPriority(-new Date().getTime());
        var id = ref.name();
        console.log("Successfully added record with id -> " + id);
        tasks.$indexFor(id);
      });

      $scope.taskInput = null;

    };

    $scope.completeTask = function (taskID) {

      var taskRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + taskID);

      $firebase(taskRef).$update({isComplete : true}).then(function(){
        console.log("Successful update -> {isComplete : true}");
      });

    };

    $scope.uncompleteTask = function (taskID) {

      var taskRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + taskID);

      $firebase(taskRef).$update({isComplete : false}).then(function(){
        console.log("Successful update -> {isComplete : false}");
      });

    };


  });

myApp.controller("HideShowLabelCtrl", function($scope) {
  $scope.data = {showLabel: false};
});

myApp.controller("LabelController", function($firebase, $scope) {

  // to test this, comment out line 103 and then uncomment out the line below.
  // $scope.data = {showLabel: false}; // this opens up one label boxes, label function works fine, but this doesn't hide after label assignment

  var ref = new Firebase("https://planhacker.firebaseio.com/users/user/");
  var labelSync = $firebase(ref.child("labels"));
  var labels = labelSync.$asArray();

    $scope.labels = labels; // note: this is for the ng-repeat {{ label in labels }}

    $scope.addLabel = function() {

      labels.$add({name: $scope.labelInput}).then(function(ref) {
        var id = ref.name();
        console.log("Successful execution of addLabel()");
        console.log("task id -> " + id);
        labels.$indexFor(id);
        $scope.labelInput = null;
        $scope.data.showLabel = true;
      });

    };

    $scope.assignLabel = function (taskID, label) {

      var taskRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + taskID);

      $firebase(taskRef).$update({label: label}).then(function(){
        console.log("Successful execution for assignLabel()");
      });

    };

    $scope.removeLabel = function(taskID) {

      var taskRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + taskID);

      $firebase(taskRef).$update({label: null}).then(function(){
        console.log("Successful execution for removeLabel()");
      });

    };

  });

myApp.controller("SideBarController", function($firebase, $scope) {

  // tasks.$bind($scope, "tasks");
  var taskSync = $firebase(ref.child("tasks"));
  var tasks = taskSync.$asArray();
  // labels.$bind($scope, "labels");
  var labelSync = $firebase(ref.child("labels"));
  var labels = labelSync.$asArray();

  $scope.renameTask = function(id, taskname) {
    var taskRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + id);

    if (taskname) {
      $firebase(taskRef).$update({
        name: taskname,
      }).then(function(ref){
        console.log("successful execution for renameTask()");
        $scope.newTaskName = null;
      });
    };
  };

  $scope.addNote = function(id, noteInput) {
    var taskRef = new Firebase("https://planhacker.firebaseio.com/users/user/tasks/" + id);

    if (noteInput) {    
      $firebase(taskRef).$update({
        note: noteInput,
      }).then(function(ref){
        console.log("successful execution for addNote()");
        $scope.noteInput = null;
      });
    };
  };

});

var DatepickerDemoCtrl = function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 0,
    showWeeks: false,
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
};

var TimepickerDemoCtrl = function ($scope) {
  $scope.startTime = new Date("1970-01-01T08:00:00.000Z");
  $scope.endTime = new Date("1970-01-01T08:00:00.000Z");

  $scope.hstep = 1;
  $scope.mstep = 30;

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.changed = function () {
    console.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.startTime = new Date("1970-01-01T08:00:00.000Z");
    $scope.endTime = new Date("1970-01-01T08:00:00.000Z");
  };
};

