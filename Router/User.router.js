const express = require("express");
const UserRoute = express.Router();
const {UserModel} = require("../Model/User.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

UserRoute.post("/register",async(req,res)=>{
  const {email,password,gender,name} = req.body;
  console.log(req.body)
  try {
    bcrypt.hash(password, 5,async function(err, hash) {
        // Store hash in your password DB.
        if(hash){
          req.body.password = hash;
          let user = new UserModel(req.body);
          await user.save();
          res.status(200).send({"msg":"New user has been added"})
        }else{
          console.log(err);
          res.status(400).send({"msg": "There is some issue with hashing"})
        }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({"msg": "There is some issue while creating an account"})
  }  
})

UserRoute.post("/login",async (req,res)=>{
    let {email,password} = req.body;
    const user = await UserModel.findOne({email});
    try {
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                // result == true
                if(result){
                    var token = jwt.sign({user: user.name,userID: user["_id"]}, 'masai');
                    res.status(200).send({msg:"Login Successful",token})
                }else{
                    res.status(400).send({"msg": "Wrong password"});    
                }
            });
        }else{
            res.status(400).send({"msg": "Regiter to login"})  
        }
    } catch (err) {
        res.status(400).send({"msg": "Wrong credentials"}) 
    } 
})

module.exports = {
    UserRoute
}