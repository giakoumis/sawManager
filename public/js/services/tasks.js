angular.module('taskService',[])



    .factory('Tasks',function($http){
    return {
        get: function(){
            return $http.get('/api/tasks');
        },
        create : function(taskData){
            return $http.post('/api/tasks',taskData);
        },
        delete : function(id) {
            return $http.delete('/api/tasks/'+ id);
        }
    }
});