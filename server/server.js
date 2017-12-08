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

app.post('/updateAccount', function (req, res) {
    var currentUser = req.body.currentUser;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    if (username != null) {
        var sql = "update userAccounts set Username = ? where Username = ?";
        var args = [username, currentUser];
        sql = mysql.format(sql, args);
    
        connection.query(sql, function (error, results, field) {
            if (error) {
                console.log(error);
                return res.status(400).json({ message: "Username has been taken"});
            }
    
            return res.status(200).json({ message: "Success"});
        });
    }

    if (password != null) {
        var sql = "update userAccounts set Password = ? where Username = ?";
        var args = [password, currentUser];
        sql = mysql.format(sql, args);
    
        connection.query(sql, function (error, results, field) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal Server Error"});
            }
    
            return res.status(200).json({ message: "Success"});
        });
    }

    if (email != null) {
        var sql = "update userAccounts set Email = ? where Username = ?";
        var args = [email, currentUser];
        sql = mysql.format(sql, args);
    
        connection.query(sql, function (error, results, field) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal Server Error"});
            }
    
            return res.status(200).json({ message: "Success"});
        });
    }
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

app.post('/orderstake', function(req, res) {
    var recipient = req.body.recipient;
    var orderid = req.body.orderid;

    if (!recipient) {
        return res.status(400).json({ message: "Recipient is empty"});
    }

    var sql = "update orders set Recipient = ? where ID = ?";
    var args = [recipient, orderid];
    sql = mysql.format(sql, args);

    connection.query(sql, function (error, results, field) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error"});
        }

        return res.status(200).json({ message: "Success"});
    });
});

app.get('/senderOrdersGet', function(req, res) {
    var currentUser = req.query.currentUser;

    var sql = "select * from orders where Sender = ?";
    var args = [currentUser];
    sql = mysql.format(sql, args);

    connection.query(sql,function (error, results, field) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error"});
        }

        return res.status(200).json(results);
    })
});

app.get('/recipientOrdersGet', function(req, res) {
    var currentUser = req.query.currentUser;

    var sql = "select * from orders where Recipient = ?";
    var args = [currentUser];
    sql = mysql.format(sql, args);

    connection.query(sql,function (error, results, field) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error"});
        }

        return res.status(200).json(results);
    })
});

var port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log("Running server on port " + port);
});