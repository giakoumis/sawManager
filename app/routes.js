var Task = require('./models/task');

module.exports = function(app){
    
   // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/tasks', function(req, res) {

        // use mongoose to get all todos in the database
        Task.find(function(err, tasks) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(tasks); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/tasks', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Task.create({
            name : req.body.name,
            done : false
        }, function(err, task) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Task.find(function(err, tasks) {
                if (err)
                    res.send(err)
                res.json(tasks);
            });
        });

    });

    // delete a todo
    app.delete('/api/tasks/:task_id', function(req, res) {
        Task.remove({
            _id : req.params.task_id
        }, function(err, task) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Task.find(function(err, tasks) {
                if (err)
                    res.send(err)
                res.json(tasks);
            });
        });
    });

// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    }); 
    
    
}