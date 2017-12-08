var express = require("express");
var cors = require('cors');
var mysql = require('mysql');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'ezgrabdbinstance.cfsrlrsrxtms.us-east-2.rds.amazonaws.com',
  user     : 'EZGrabUser',
  password : 'CS252Lab6',
  database : 'ezgrab',
});
 
var app = express();
app.use(cors());

app.use(express.static('public'));

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

/*var sql = "insert into userAccounts (Username, Password) values (?, ?)";
var args = ['ryan', 'ryan'];
sql = mysql.format(sql, args);
console.log(sql);

connection.query(sql, function (error, results, fields) {
    if (error) throw error;
});*/

var port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log("Running server on port " + port);
});