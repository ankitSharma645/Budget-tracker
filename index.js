const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


const path = require('path')


const cors = require('cors');


// Your other middleware and routes

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

app.use(cors());
app.use(express.json());
//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./beta/build/index.html"));
});


//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});