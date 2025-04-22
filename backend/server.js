const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "add2cart"
})

app.post("/register/user-create", (req, res) => {
    const sql = "INSERT INTO `user-accounts` (`name`,`password`,`status`) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.password,
        'inactive'
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Insert error:", err);
            return res.json({ message: "Error Inserting Account" });
        }
        return res.json({ success: "Successfully Inserted an Account" });
    });
});

app.post("/login", (req, res) =>{
    const sql = "SELECT * FROM `user-accounts` WHERE `name` = ? AND `password` = ?"
    const values = [
        req.body.name,
        req.body.password
    ]
    db.query(sql, values, (err, result) =>{
        if (err) return res.json({message : "Error Login"})
        if(result.length > 0){
            return res.json("Login Successfully")
        }else{
            return res.json("No Record")
        }
    })
})

const port = 5000

app.listen(port, () => {
    console.log("Listening")
})