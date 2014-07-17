(function(window, angular, undefined) {

"use strict";

// baseRef - starting point "/"
angular.module('planhacker', ['firebase'])
.factory("baseRef", ["$firebase", function($firebase) {
    var ref = new Firebase("https://planhacker.firebaseio.com/");
    return $firebase(ref);
}])
// userRed - "/users"
.factory("userRef", ["baseRef", "$firebase", function(baseRef, $firebase) {
    return baseRef.$child('users');
    // return ref;
    // // return $firebase(ref);
}])
// user_idRef
.factory("user_ID", ["userRef", "$firebase", function(userRef, $firebase) {
    return userRef.$child('user_ID');
    // return $firebase(ref);
}])
.factory("taskRef", ["user_ID", "$firebase", function(user_ID, $firebase) {
    return user_ID.$child('tasks');
    // return $firebase(ref);
}])
.factory("task_ID", ["taskRef", "$firebase", function(taskRef, $firebase) {
    return taskRef.$child('task_ID');
    // return $firebase(ref);
}])
.controller("AddListItemController", ["$scope", "task_ID", function($scope, task_ID) {
    $scope.addTask = function() {
        $scope.newTask = task_ID;
        $scope.newTask.$add({name:$scope.inputTask});
    };
}]);

})(window, window.angular);

// // baseRef - starting point
// angular.module('plan4me', ['firebase'])
// .factory("baseRef", ["$firebase", function($firebase) {
//     return new Firebase("https://plan4meapp.firebaseio.com");
// }])
// // // userRef - /users
// // .factory("userRef", ["baseRef", "$firebase", function(baseRef, $firebase) {
// //     var ref = baseRef.child('users');
// //     return $firebase(ref);
// // }])
// // // taskRef - /users/tasks
// // // .factory("taskRef", ["userRef", "$firebase", function(userRef, $firebase) {
// // //     var ref = userRef.child('tasks');
// // //     return $firebase(ref);
// // // }])
// // the taskRef gets passed on to the controller
// .controller("AddListItemController", ["$scope", "baseRef", function($scope, baseRef) {
//         $scope.addTask = function() {
//             $scope.newTask = baseRef;
//             // console.log($scope.inputTask);
//             // $scope.newTask = $scope.inputTask;
//             baseRef.$add("Something");
//             // $scope.newTask.$add($scope.inputTask);
//     };
// }]);

// })(window, window.angular);


// (function(window, angular, undefined) {


// "use strict";


// angular.module('plan4me', ["firebase"])

// .factory("Task", ["$firebase", function($firebase) {

//     var ref = new Firebase("https://plan4meapp.firebaseio.com/").limit(1);

//     return $firebase(ref);

// }])
// .controller("AddListItemController", ["$scope", "Task", function($scope, Task) {

//    $scope.addTask = function() {

//     $scope.newTask = Task; 

//     $scope.newTask.$add($scope.inputTask);

// };
// }]);


// })(window, window.angular);






//.factory('Task', ['$resource', function($resource) {
//  Code goes here to connect to firebase
//}])
//.controller('AddListItemController', ['$scope', 'Task', function($scope, Task) {


//https://plan4meapp.firebaseio.com/#-JRN-8ozu5P0OieKRCuS|b58475b68a41172615949a1b86414fa5



// <div class="col-sm-6" ng-controller="AddListItemController">
//             <form role="form">
//               <div class="form-group">
//                 <label for="inputTask">Change <code>$scope.inputTask</code></label>
//                 <input ng-model="inputTask" type="text" class="form-control"
//                 name="inputTask" id="inputTask" placeholder="Add a task">
//               </div>
//               <button ng-click="addTask()" type="submit" class="btn btn-primary">
//                 Add task
//               </button>
//               <span class="text-muted">
//                 (Click on the button to update <code>$scope.newTask</code>)
//               </span>
//             </form>
//             <br>
//             <div class="panel panel-default">
//               <div class="panel-heading">
//                 <h3 class="panel-title">Angular $scope demo</h3>
//               </div>
//               <div class="panel-body">
//                 <p><code>$scope.inputTask</code>: {{ inputTask }}</p>
//                 <p><code>$scope.newTask</code>: {{ newTask }}</p>
//               </div>
//             </div>
//           </div>
//         </div>