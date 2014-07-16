(function(window, angular, undefined) {

"use strict";

// baseRef - starting point
angular.module('plan4me', ['firebase'])
.factory("baseRef", ["$firebase", function($firebase) {
    return new Firebase("https://plan4meapp.firebaseio.com");
}])
// userRef - /users
.factory("userRef", ["baseRef", "$firebase", function(baseRef, $firebase) {
    var ref = baseRef.child('users');
    return $firebase(ref);
}])
// taskRef - /users/tasks
.factory("taskRef", ["userRef", "$firebase", function(userRef, $firebase) {
    var ref = userRef.child('tasks');
    return $firebase(ref);
}])
// the taskRef gets passed on to the controller
.controller("AddListItemController", ["$scope", "taskRef", function($scope, taskRef) {
    $scope.addTask = function() {
        $scope.newTask = taskRef; 
        $scope.newTask.$add($scope.inputTask);
    };
}]);

})(window, window.angular);

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