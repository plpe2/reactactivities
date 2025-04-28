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

// Updated CRUD endpoints to include mobile number, email, address, and gender fields in the `user-accounts` table.

// Endpoint to register a new user account
app.post("/register/user-create", (req, res) => {
    const sql = "INSERT INTO `user-accounts` (`name`, `password`, `status`, `mobile`, `email`, `address`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.password,
        'inactive',
        req.body.mobile,
        req.body.email,
        req.body.address,
        req.body.gender
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Insert error:", err);
            return res.json({ message: "Error Inserting Account" });
        }
        return res.json({ success: "Successfully Inserted an Account" });
    });
});

// Endpoint to handle user login
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

// Endpoint to fetch search results based on a partial name match
app.post("/search-results/:val", (req, res) =>{
    const sql = "SELECT * FROM `user-accounts` WHERE name LIKE CONCAT('%', ?, '%')"

    db.query(sql,req.params.val, (err, result) =>{
        if (err) return ({message : "Error fetching Search Results"})
        return res.json(result)
    })
})

// Endpoint to fetch all user accounts
app.post("/view-users", (req, res) => {
    const sql = "SELECT `id`, `name`, `mobile`, `email`, `address`, `gender`, `status`, `password` FROM `user-accounts`";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: "Error Fetching all users" });
        return res.json(result);
    });
});

// Endpoint to fetch a specific user's profile by ID
app.post("/user-profile/:id", (req, res) => {
    const sql = "SELECT `id`, `name`, `mobile`, `email`, `address`, `gender`, `status` FROM `user-accounts` WHERE `id` = ?";
    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.json({ message: "Error fetching user profile" });
        return res.json(result);
    });
});

// Endpoint to update a user's details by ID
app.put("/update-user/", (req, res) => {
    const sql = "UPDATE `user-accounts` SET `name`= ?,`email`= ?,`gender`= ?,`address`= ?,`mobile`= ?,`password`= ? WHERE `id` = ?"
    const values = [
        req.body.name,
        req.body.email,
        req.body.gender,
        req.body.address,
        req.body.mobile,
        req.body.password,
        req.body.id
    ]
    db.query(sql, values, (err, result) =>{
        if (err) return res.json({message : "Error Updating User Profile"})
        return res.json({success : "Successfully Updated User Profile"})
    })
});

// Endpoint to delete a user account by ID
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