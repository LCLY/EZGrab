var express = require("express");

var app = express();

app.use(express.static('public'));

var port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log("Running server on port " + port);
});