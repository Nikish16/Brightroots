const express = require("express")
let app = express();
const multer = require("multer");
const path = require("path");
const ejs = require("ejs");

//Multer setup

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/myuploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ 
    storage: storage,
    
}).single("profilepic");




//srtup ejs
app.set("view engine", "ejs");

// Static folder
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render("index");
});

// post route
app.post("/upload", (req, res) =>{
upload(req, res, (error) => {
    if (error) {
        res.render("index", {
            message: error
        });
    }else{
        res.render("index",{
            message: "Successful upload",
            filename: "myupload/${req.file.filename}"
        });
    }
});
});

//server
app.listen(3000, (req, res) => {
    console.log("Server is running......");
});