const express = require("express");
const app = express();
const {connection} = require("./db")
const {UserRoute} = require("./Router/User.router")
const {PostRoute} = require("./Router/Post.router")
const {Auth} = require("./Middleware/Authentication");
require("dotenv").config();


app.use(express.json());
app.use("/user",UserRoute);

app.use(Auth);
app.use("/post",PostRoute);

app.listen(8080,async ()=>{
  try {
    await connection;
    console.log(`port is running at ${process.env.port}`)
  } catch (err) {
    console.log(err);
  }
})