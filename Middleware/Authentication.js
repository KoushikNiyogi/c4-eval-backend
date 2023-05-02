const jwt = require('jsonwebtoken');

const Auth = (req,res,next)=>{
  const token = req.headers.authorization;
  console.log(token)
  if(token){
    let decode = jwt.verify(token.split(" ")[1], "masai");
    console.log(decode);
    if(decode){
      req.body["userID"] = decode.userID;
      next();
    }else{
        res.status(400).send({"msg": "You are not authorized to do this action"})  
    }
  }else{
    res.status(400).send({"msg": "Please login to continue"})
  }
}

module.exports = {
    Auth
}