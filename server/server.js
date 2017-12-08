var express = require("express");
var cors = require('cors');

var app = express();
app.use(cors());

app.use(express.static('public'));

app.get('/', function(req, res) {
	return res.send("Hello World");
});

var port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log("Running server on port " + port);
});