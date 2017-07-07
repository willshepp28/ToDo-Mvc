

// Require Dependencies =============================================== >

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const app = express();

const models = require('./models');




// Middleware =============================================== >

app.set('port', process.env.PORT || 3000);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// parse application/json
app.use(bodyParser.json())

app.use('/static', express.static('static'));








// Handler =============================================== >

app.get('/', function (req, res) {

    res.sendFile(__dirname + "/static/index.html");
});

// return a JSON array of todo items
app.get('/api/todos', async function (req, res) {
    var list = models.List.findAll().then(function (links) {

        return res.json(links);
    });


});

// post a JSON representation of a todo and have it saved. Returns the saved todo item in JSON.
app.post('/api/todos', async function (req, res) {
    const list = req.body;

    var todolisting = await models.List.create(
        list
    )
        .then(list => {
            return res.json(list);
        });
});



//  get a specific todo item.
app.get('/api/todos/:id', function (req, res) {
    const id = req.params.id;

    var todolisting = models.List.find({
        where: { id: id }
    })
        .then(list => {
            res.json(list);
        });
});

// update a todo item. Returns the modified todo item
app.put('/api/todos/:id', async function (req, res) {
  var id = parseInt(req.params.id);

  var itemToUpdate = await models.List.find({where: {
      id: id
  }})

  itemToUpdate.update(req.body);

});


// deletes a todo item. Returns the todo item that was deleted.
app.delete('/api/todos/:id', async function (req, res) {
    var id = parseInt(req.params.id);
    models.List.destroy({
        where: { id: id }
    })
    .then(function(){
        return res.redirect('/');
    });

});









// Start Server ===============================================>

app.listen(app.get('port'), function () {
    console.log('Express running on http://localhost:3000/.')
});
