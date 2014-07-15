(function(window, angular, undefined) {

"use strict";

angular.module('plan4me', ["firebase"])
.factory("Task", ["$firebase", function($firebase) {
    var ref = new Firebase("https://plan4meapp.firebaseio.com/").limit(1);
    return $firebase(ref);
}])
.controller("AddListItemController", ["$scope", "Task", function($scope, Task) {
   $scope.addTask = function() {
    $scope.newTask = Task; 
    $scope.newTask.$add($scope.inputTask);
    $scope.newTask = $scope.inputTask;
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