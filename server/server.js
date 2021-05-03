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


app.get('/api', (req,res) => {
    var sql = "SELECT * FROM data";
    db.query(sql, (err, result) =>{
        console.log(result);
        res.send(result);
    })
})
app.post("/api", (req,res) => {
    const itemName= req.body.itemName;
    console.log(itemName);
    var sql = "INSERT INTO data (name) VALUES (?)";
    db.query(sql, [itemName], (err, result) =>{
        if (err) throw err;
        console.log("1 record inserted");
    })
});
app.put("/api/:dataId", (req,res) => {
    console.log("update");
    const dataId= req.params.dataId;
    const dataName= req.body.dataName;
    console.log(dataId,dataName);
    var updateSql = "UPDATE data SET name = ? WHERE id = ?";
    db.query(updateSql,[dataName,dataId], (err,result)=>{
        if (err) throw err;
        console.log("1 record updated");       
    })
});
app.delete("/api/:dataId", (req,res) => {
    console.log("delete");
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
