var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('blog.db');
var app = express();
var PORT = 3000;

app.use(bodyParser.json)


db.serialize(function () {
    app.listen(PORT, function () {
        console.log('connected to db, listening on port');
    });
});