var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));


app.get('/', function (req, res) {
    res.send('Welcome to Ritesh');
})

// Show Data

app.get('/showData', function (req, res) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "crud"
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM crud_table", function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
        });
    });
})

// Delete Data

app.post('/deleteData', function (req, res) {
    var mysql = require('mysql');
    var data = req.body
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "crud"
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query(`DELETE FROM crud_table WHERE id = '${data.id}'`, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
        });
    });
})

// Insert Data

app.post('/insertData', function (req, res) {
    var mysql = require('mysql');
    var data = req.body
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "crud"
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query(`INSERT INTO crud_table (id, name, email) VALUES ('null', '${data.name}', '${data.email}')`, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
        });
    });
})

// Send Data For Update

app.post('/selectOneData', function (req, res) {
    var mysql = require('mysql');
    var data = req.body
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "crud"
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query(`SELECT * FROM crud_table WHERE id = '${data.id}'`, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
        });
    });
})

// Update Data

app.post('/updateData', function (req, res) {
    var mysql = require('mysql');
    var data = req.body
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "crud"
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query(`UPDATE crud_table SET name = '${data.name}', email='${data.email}' WHERE id = '${data.id}'`, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
        });
    });
})
var server = app.listen(8000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})  