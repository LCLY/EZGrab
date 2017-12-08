var express = require("express");
var bodyParser = require("body-parser");
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

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static('public'));

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

app.post('/createAccount', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    if (username == null) {
        return res.status(400).json({ message: "Invalid username."});
    } 

    if (password == null) {
        return res.status(400).json({ message: "Invalid password"});
    }

    if (email == null) {
        return res.status(400).json({ message: "Invalid email"});
    }

    var sql = "insert into userAccounts (Username, Password, Email) values (?, ?, ?)";
    var args = [username, password, email];
    sql = mysql.format(sql, args);

    connection.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.status(400).json({ message: "Username has been taken"});
        }

        return res.status(200).json({ message: "Success" });
    });
});

app.post('/signin', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (username == null || password == null) {
        return res.status(400).json({ message: "Invalid username or password"});
    }

    var sql = "select * from userAccounts where Username = ? and Password = ?";
    var args = [username, password];
    sql = mysql.format(sql, args);

    connection.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error"});
        }

        if (results.length === 0) {
            return res.status(400).json({ message: "Invalid username or password"});
        }

        return res.status(200).json({ message: "Success"});
    });
});

app.post('/ordersadd', function (req, res) {
    var buyLocation = req.body.buyLocation;
    var dropLocation = req.body.dropLocation;
    var sender = req.body.sender;
    var notes = req.body.notes;

    if (!buyLocation) {
        return res.status(400).json({ message: "Buy Location is empty"});
    }

    if (!dropLocation) {
        return res.status(400).json({ message: "Drop Location is empty"});
    }

    if (!sender) {
        return res.status(400).json({ message: "Sender is empty"});
    }

    if (!notes) {
        return res.status(400).json({ message: "Notes is empty"});
    }

    var sql = "insert into orders (BuyLocation, DropLocation, Sender, Notes) values (?, ?, ?, ?)";
    var args = [buyLocation, dropLocation, sender, notes];
    sql = mysql.format(sql, args);

    connection.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error"});
        }

        return res.status(200).json({ message: "Success" });
    });
});

var port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log("Running server on port " + port);
});