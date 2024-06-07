import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vijay2002",
    database: "Proj"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id ' + db.threadId);
});

app.get("/", (req, res) => {
    res.json("Hello, this is the backend");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => { // Fixed the parentheses here
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books(title, des, price, cover) VALUES (?)";
    const values = [
        req.body.title,
        req.body.des,
        req.body.price,
        req.body.cover
    ];
    db.query(q, [values], (err, data) => { // Fixed the parentheses here
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete("/book/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id=?"

    db.query(q,[bookId], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Book has been deleted successfully.");
    })
})

app.put("/book/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET title=?,des=?,price=?,cover=? WHERE id=?"

    const values = [
        req.body.title,
        req.body.des,
        req.body.price,
        req.body.cover
    ];

    db.query(q,[...values,bookId], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Book has been updated successfully.");
    })
})

app.listen(8800, () => {
    console.log("Connected to backend!");
});
