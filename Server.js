const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2"); // Import the mysql2 library
app.use(cors());
// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "userdetails"
});
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});
db.query(`
  CREATE TABLE IF NOT EXISTS userdata (
    empid VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) PRIMARY KEY
  )
`, (err, results) => {
  if (err) {
    console.error("Error creating table:", err);
  } else {
    console.log("Table created");
  }
});
 // Middleware to parse JSON request bodies
app.use(express.json());
app.post("/api/Signupdata", (req, res) => {
  console.log("hello");
  const userdetails = req.body;
  // Insert user details into the database
  db.query(
    "INSERT INTO userdata (empid, username, password, email) VALUES (?, ?, ?, ?)",
    [userdetails.empid, userdetails.username, userdetails.password, userdetails.email],
    (err, results) => {
      if (err) {
        console.error("Error inserting user details:", err);
        res.status(500).json({ message: "Error inserting user details" });
      } else {
        res.status(201).json({ message: "User registered successfully" });
      }
    }
  );
});
app.post("/api/Logindata", (req, res) => {
  const { userlogindetails } = req.body;
  // Check if the username and password match a record in the database
  db.query(
    "SELECT * FROM userdata WHERE email = ? AND password = ?",
    [userlogindetails.email, userlogindetails.password],
    (err, results) => {
      if (err) {
        console.error("Error checking user details:", err);
        res.status(500).json({ message: "Error checking user details" });
      } else {
        if (results.length > 0) { 
          const user = results[0]; // Assuming the first result contains the user data
          console.log('User data from DB:', user);
          // Send the user data in the response
          res.status(200).json({ user });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      }
    }
  );
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
