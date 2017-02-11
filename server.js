var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('blog.db');
var app = express();
var PORT = 3000;

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Blog API Root');
    //console log to test connection
    console.log('hit root')
});

// app.get('/posts', function (req, res) {
//    db.posts.findAll().then(function(posts) {
//        res.json(posts);
//    }).then(function(e) {
//        res.status(500).send();
//    });
// });

db.serialize(function () {
    app.listen(PORT, function () {
        console.log('connected to db, listening on port');
    });
});