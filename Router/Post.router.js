const express = require("express");
const PostRoute = express.Router();
const { PostModel } = require("../Model/Post.model");
const jwt = require('jsonwebtoken');

PostRoute.post("/create", async (req, res) => {
    try {
      const post = new PostModel(req.body);
      await post.save();
      res.status(200).send({"msg": "New post has been added"});
    } catch (err) {
        console.log(err);
        res.status(400).send({"msg": "Cannot add new post!!!"});
    }
})

PostRoute.get("/", async (req, res) => {
    const query = req.query;
    try {
      const post =await PostModel.find({userID : req.body.userID,device : query.device});
      res.status(200).send({post});
    } catch (err) {
        res.status(200).send({"err":err});
    }
})

PostRoute.patch("/update/:id", async (req, res) => {
    const {id} = req.params;
    const post = await PostModel.findOne({_id:id});
    if(post.userID === req.body.userID){
        try {
          const post = await PostModel.findByIdAndUpdate({_id:id},req.body);
          console.log(post)
          res.status(200).send({"msg": `Post with id ${id} has been updated`})
        } catch (err) {
            console.log(err);
          res.status(400).send({"msg":"Something went wrong"});
        }
    }else{
        res.status(400).send({"msg":"You are not autherized to perform this operation"});
    }
    
})

PostRoute.delete("/delete/:id", async (req, res) => {
    const {id} = req.params;
    const post = await PostModel.findOne({_id:id});
    if(post.userID === req.body.userID){
        try {
          const post = await PostModel.findByIdAndDelete({_id:id});
          res.status(200).send({"msg": `Post with id ${id} has been deleted`})
        } catch (err) {
             res.status(400).send({"msg":"Something went wrong"});
        }
    }else{
        res.status(400).send({"msg":"You are not autherized to perform this operation"});
    }
})




module.exports = {
    PostRoute
}