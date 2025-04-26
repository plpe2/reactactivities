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
        req.body.email,
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

app.post("/search-results/:val", (req, res) =>{
    const sql = "SELECT * FROM `user-accounts` WHERE name LIKE CONCAT('%', ?, '%')"

    db.query(sql,req.params.val, (err, result) =>{
        if (err) return ({message : "Error fetching Search Results"})
        return res.json(result)
    })
})

app.post("/view-users", (req, res) =>{
    const sql = "SELECT * FROM `user-accounts`"
    db.query(sql, (err, result) => {
        if (err) return res.json({message : "Error Fetching all users"})
        return res.json(result)
    })
})

app.post("/user-profile/:id", (req, res) =>{
    const sql = "SELECT * FROM `user-accounts` WHERE `id` = ?"

    db.query(sql,req.params.id, (err, result) =>{
        if (err) return ({message : "Error fetching Search Results"})
        return res.json(result)
    })
})

app.put("/update-user/:id", (req, res) =>{
    const id = req.params.id
    const sql = "UPDATE `user-accounts` SET `name` = ? WHERE `id` = ?"
    const values = [
        req.body.name,
        id
    ]
    db.query(sql, values, (err, result) =>{
        if (err) res.json({message : "Error Updating the user details"})
        return res.json({success : "Successfully Update the user details"})
    })
})

app.delete("/delete-user/:id", (req, res) =>{
    const sql = "DELETE FROM `user-accounts` WHERE `id` = ?"
    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.json({message : "Error Deleting User"})
        return res.json({success : "Successfully Deleted the User"})
    })
})

const port = 5000

app.listen(port, () => {
    console.log("Listening")
})