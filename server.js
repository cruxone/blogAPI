var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('blog.db');
var app = express();
var PORT = 3000;

app.use(bodyParser.json());

app.get('/', function (req, res) {
    console.log('Blog API Root hit');
});

//get all blog posts
//need data to be returned in an array
app.get('/posts', function (req, res) {
    console.log('/post end point hit')
    //array initialized to contain all posts
    posts = []
    db.serialize(function() {
        //iterate through each post and append posts array with data
        db.each("SELECT post_id AS id, title, body FROM posts", function(err, row) {
            posts += [row.id + " : " + row.title + " : " + row.body]
        }, function(err, row) {
            //completion callback for the db each call, printing posts array
            console.log(posts);
        });
    });
});

//put a blog post
app.post('/post', function (req, res) {
    console.log('/post end point hit');
});


db.serialize(function () {
    app.listen(PORT, function () {
        console.log('connected to db, listening on port');
    });
});