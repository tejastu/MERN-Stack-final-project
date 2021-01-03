let jwt = require("jsonwebtoken");
let config = require("config");

function UserAuth(req, res, next) {
   let token = req.header("x-auth-token");
   if (!token) {
      return res.status(404).send({ message: "invalid token" });
   }
   try {
      const decoded = jwt.verify(token, config.get("APP_JWTPRIVATEKEY"));
      req.user = decoded;
      next();
   } catch (ex) {
      res.status(402).send({ message: "access denied", error: ex.message });
   }
}
module.exports = UserAuth;

// let jwt = require("jsonwebtoken");
// let config = require("config");

// function Userauth(req , res, next){
//     let token= req.header("x-auth-token");
//     try{
//         if(!token) {
//             return res.status(404).send({message:"not found"})

//         }
//         const decoded = jwt.verify(token , config.get("apitoken"));
//         req.user = decoded;
//         req.user._id;
//         next();

//     }
//     catch(ex)
//     {
//         return res.status(402).send({message :" access denied"})
//     }

// };
//  module.exports = Userauth;
