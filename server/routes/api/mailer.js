let express = require("express");
let router = express.Router();
let nodemailer = require("nodemailer");
let User = require("../schema/userModel");
let crypto = require("crypto");

router.post("/nodemailer", async (req, res) => {
   let user = await User.userModel.findOne({
      "UserLogin.EmailId": req.body.UserLogin.EmailId,
   });
   if (!user) {
      return res.status(402).send({ message: "Invalid email id" });
   }
   let token = crypto.randomBytes(30).toString("hex");
   user.resetpasswordtoken = token;
   user.resetpasswordexpire = Date.now() + 3600000;
   await user.save();

   let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports

      auth: {
         user: "webkitchen100@gmail.com", // generated ethereal user
         pass: "nahidenar45", // generated ethereal password
      },
      tls: { rejectUnauthorized: false },
      debug: true,
   });

   if (!transporter)
      res.status(401).send({
         message: "something went wrong",
      });
   // setup email data with unicode symbols
   let mailOptions = {
      from: '"TT Electronics App:sweat_smile:" <webkitchen100@gmail.com>', // sender address
      // @ts-ignore
      to: user.UserLogin.EmailId, // list of receivers
      subject: "Reset Your Password", // Subject line:smile:
      text:
         "Open this link to change your password http://localhost:6900/forgotpassword/" +
         token, // plain text body
   };
   //http://localhost:3000/forgotpassword

   // send mail with defined transport object
   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
   });
   res.send({ message: "Please Check your Email", d: user });
});

module.exports = router;
