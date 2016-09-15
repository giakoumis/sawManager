angular.module('taskController',[])

    .controller('mainController',function($scope,$http,Tasks){
    
        $scope.formData = {};
    
    
    //get tasks
    Tasks.get()
                .success(function(data) {
                        $scope.tasks = data;
                });
                

        // when submitting the add form, send the text to the node API
        $scope.createTask = function() {
            
            if (!$.isEmptyObject($scope.formData)) {

                Tasks.create($scope.formData)
                        .success(function(data) {
                                $scope.formData = {}; // clear the form so our user is ready to enter another
                                $scope.tasks = data;
                        });
            }
                        
        };

        // delete a todo after checking it
        $scope.deleteTask = function(id) {
                Tasks.delete(id)
                        .success(function(data) {
                                $scope.tasks = data;
                       
                        
                        });
        };

});