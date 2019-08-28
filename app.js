const express = require("express");
var mongoose = require("mongoose");

var mongo1 = mongoose.createConnection("mongodb://mongo1:27017/deusdara", {useNewUrlParser: true});
var mongo2 = mongoose.createConnection("mongodb://mongo2:27017/deusdara", {useNewUrlParser: true});

const bodyParser = require("body-parser");

var app = express();

var schema = new mongoose.Schema({})

const customerModelMongo1 = mongo1.model("customer", schema);
const customerModelMongo2 = mongo2.model("customer", schema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get("/mongo1", async function (request, response) {
    try {
        var result = await customerModelMongo1.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/mongo2", async function (request, response) {
    try {
        var result = await customerModelMongo2.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


app.listen(3000, () => {
    console.log("Listening at :3000...");
});