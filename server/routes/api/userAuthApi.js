let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let User = require("../schema/userModel");
let bcrypt = require("bcrypt");
let auth = require("../../middleware/userAuth");
let admin = require("../../middleware/admin");

// router.get("/fetchuser", [auth, admin], async (req, res) => {
//    let data = await User.userModel.find();
//    res.send({ d: data });
// });
//****************** [ fetch all users ] *********************
router.get("/users", async (req, res) => {
   let getAllRecord = await User.userModel.find(); // userModel.find() to Model.find()
   res.send({
      message: getAllRecord,
   });
});

//****************** [ Register new  user ] *********************
router.post("/register", async (req, res) => {
   let user = await User.userModel.findOne({
      "UserLogin.EmailId": req.body.UserLogin.EmailId,
   });
   if (user) {
      return res.status(403).send({ message: "User Already Exist" });
   }

   let { error } = User.validationError(req.body);
   if (error) {
      return res.send(error.details[0].message);
   }

   let newuser = new User.userModel({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      UserLogin: {
         EmailId: req.body.UserLogin.EmailId,
         password: req.body.UserLogin.password,
      },
   });

   let salt = await bcrypt.genSalt(10);
   newuser.UserLogin.password = await bcrypt.hash(
      newuser.UserLogin.password,
      salt
   );
   console.log(newuser.UserLogin.password);
   let data = await newuser.save();
   res.send({ message: "Registration Successful", d: data });

   // let createUsertoken = await createUser.save();
   // let token = jwt.sign({_id: createUsertoken._id}, 'electronicsPrivateKey')
   // let token = createUser.getuserToken();
   // res.header("x-auth-token", token).send({
   //    message: "Thanks for the registration",
   //    token: token,
   // });
});

//****************** [ Log in user ] *********************
router.post("/login", async (req, res) => {
   let result = User.AuthValidation(req.body);
   if (result.error) {
      return res
         .status(403)
         .send({ errorMessage: result.error.details[0].message });
   }

   let user = await User.userModel.findOne({
      "UserLogin.EmailId": req.body.UserLogin.EmailId,
   });
   if (!user) {
      return res.status(401).send({ message: "User not exist" });
   }
   console.log(user.UserLogin.password);
   let comparePassword = await bcrypt.compare(
      req.body.UserLogin.password,
      user.UserLogin.password
   );
   console.log(comparePassword);
   if (!comparePassword) {
      return res.status(401).send({ message: "Please enter valid Password" });
   }

   let token = user.UserToken();
   console.log(token);
   res.header("x-auth-token", token).send({
      message: "Login Successful",
      token: token,
   });

   res.send({ message: "Login Successful" });
});

// ***************** [Admin Login] *********************
router.get("/me", auth, async (req, res) => {
   console.log(req.user._id);
   let u = await User.userModel
      .findById(req.user._id)
      .select("-UserLogin.password -isAdmin");
   console.log(u);
   if (!u) {
      return res.status(403).send({ message: "invalid loggedin user" });
   }
   res.send({ user: u });
});

//fetch data by id

router.get("/fetchuser/:id", async (req, res) => {
   let user = await User.userModel.findById(req.params.id);
   if (!user) {
      return res.status(404).send({ message: "Invalid user id" });
   }
   res.send({ data: user });
});

//update data

router.put("/updateuser/:id", async (req, res) => {
   let user = await User.userModel.findById(req.params.id);

   if (!user) {
      return res.status(404).send({ message: "Invalid user id" });
   }
   let { error } = User.validationError(req.body);
   if (error) {
      return res.send(error.details[0].message);
   }

   // @ts-ignore
   (user.FirstName = req.body.FirstName),
      // @ts-ignore
      (user.LastName = req.body.LastName),
      // @ts-ignore
      (user.newsletterCheck = req.body.newsletterCheck),
      // @ts-ignore
      (user.UserLogin.EmailId = req.body.UserLogin.EmailId),
      // @ts-ignore
      (user.UserLogin.password = req.body.UserLogin.password),
      // @ts-ignore
      (user.isAdmin = req.body.isAdmin);
   await user.save();
   res.send({ message: "data updated" });
});

//Remove data

router.delete("/removeuser/:id", [auth, admin], async (req, res) => {
   let user = await User.userModel.findByIdAndRemove(req.params.id);
   if (!user) {
      return res.status(404).send({ message: "Invalid User Id" });
   }
   res.send({ message: "Thank You! Come Back Again:)" });
});

//IEP information expert principle

module.exports = router;
