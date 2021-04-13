const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "todo_list"
});
const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/api/get', (req,res) => {
    var sql = "SELECT * FROM data";
    db.query(sql, (err, result) =>{
        console.log(result);
        res.send(result);
    })
})
app.post("/api/add", (req,res) => {
    const itemName= req.body.itemName;
    console.log(itemName);
    var sql = "INSERT INTO data (name) VALUES (?)";
    db.query(sql, [itemName], (err, result) =>{
        if (err) throw err;
        console.log("1 record inserted");
    })
});

app.delete("/api/delete/:dataId", (req,res) => {
    console.log("shh");
    const itemName= req.params.dataId;
    console.log(itemName);
    var deleteSql = "DELETE FROM data WHERE id = ?";
    db.query(deleteSql, itemName, (err, result) =>{
        if (err) throw err;
        console.log("1 record deleted");
    })
});
app.listen(3004, () => {
    console.log("copnnected")
})