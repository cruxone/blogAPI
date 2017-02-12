var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var date = require('date-and-time');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('blog.db');
var app = express();
var PORT = 3000;

app.use(bodyParser.json());

app.get('/', function (req, res) {
    console.log('Blog API Root hit');
});

//get all blog posts
app.get('/posts', function (req, res) {
    console.log('/posts end point hit')
    //array initialized to contain all posts
    posts = []

    db.serialize(function() {
        //iterate through each post and append posts array with data
        db.each("SELECT post_id AS id, title, body FROM posts", function(err, row) {
           // posts.push({row.id:""})
            posts.push([row.id + " : " + row.title + " : " + row.body])
        }, function(err, row) {
            //completion callback for the db each call, printing posts array
            res.json(posts);
        });
    });
});

//put a blog post
app.post('/post', function (req, res) {
    console.log('/post end point hit');
    var newPost = _.pick(req.body, 'title', 'body')
    var titleParse = newPost.title.split(" ");
    var timeStampID =  titleParse[0].toLowerCase() + date.format(new Date(), 'DD-MM-YYYY');
    db.run("INSERT INTO posts (post_id, title, body) VALUES ($id, $title, $body)", {
        $id: timeStampID,
        $title: newPost.title,
        $body: newPost.body
    }, function(req,row) {
        console.log(timeStampID + " written to database");
        res.json(newPost);
    });
});
app.listen(PORT, function () {
    console.log('connected to db, listening on port');
});
