import express from "express";
import mysql from "mysql2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";
const salt = 10;

const app = express();
app.use(express.json()); //json parsing
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
); // cors middleware
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "test",
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated!" });
  } else {
    jwt.verify(token, "serverside-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: `Failed to verify token +  ${err}` });
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res, next) => {
  return res.json({ Status: "Success", name: req.username });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const sql = "INSERT INTO user_credentials (`username`,`password`) VALUES (?)";
  bcrypt.hash("" + password, salt, (err, hash) => {
    if (err) {
      return res.json({ Error: `Error for hassing password +  ${err}` });
    }
    const values = [username, hash];
    db.query(sql, [values], (err, result) => {
      if (err) {
        return res.json({ Error: `Insert Error +  ${err}` });
      }
      return res.json({ Status: "Success" });
    });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM user_credentials WHERE username = ?";
  db.query(sql, username, (err, data) => {
    if (err) {
      return res.json({ Error: `Login error in server +  ${err}` });
    }

    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (err, response) => {
        if (err)
          return res.json({ Error: `Password compare error: +  ${err}` });

        if (response) {
          const token = jwt.sign({ username }, "serverside-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token);

          return res.json({ Status: "Success" });
        } else {
          return res.json({ Error: `Password not matched: +  ${err}` });
        }
      });
    } else {
      return res.json({ Error: `Login error in server +  ${err}` });
    }
  });
});

app.listen(8081, () => {
  console.log("Server started at 8081");
});
