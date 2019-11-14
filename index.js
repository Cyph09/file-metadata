const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();

app.set("view engine", "pug");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});
app.post("/api/fileanalyse", multer().single("fileName"), (req, res) => {
    const file = req.file;
    console.log(file);
    res.json({
        name: file.originalname,
        type: file.mimetype,
        size: file.size
    });
});

// Server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});