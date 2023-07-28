const express = require('express');
const bodyParser = require('C');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "studentdb"
});

database.connect(function (error) {
    if (error) {
        console.log("connection failed");
    } else {
        console.log("DB connected")
    }
});

app.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;
    const gender = req.body.gender;
    const address = req.body.address;
    const password = req.body.password;
    const sql = "INSERT INTO student_info(name, email, age, gender, address, password) VALUES(?, ?, ?, ?, ?, ?);";
    database.query(sql, [name, email, age, gender, address, password], function (error, result) {
        if (error) throw error;
        res.redirect('/register');
    });
});

app.get('/register', (req, res) => {
    const sql = "SELECT * FROM student_info;";
    database.query(sql, function (error, result) {
        if (error) throw error;
        res.render(__dirname + '/register', { details: result });
    });
});

app.listen(5000, function (error) {
    if (error) {
        console.log("Server connection failed");
    } else {
        console.log("Server connected")
    }
});
