let express = require("express");
let router = express.Router();
let nodemailer = require("nodemailer");
let contact = require("../schema/contactModel");

router.post("/sendMail", async (req, res) => {
   let { error } = contact.contactValidation(req.body);
   if (error) {
      return res.send(error.details[0].message);
   }

   let contacts = contact.contactModel({
      fname: req.body.fname,
      subject: req.body.subject,
      userEmail: req.body.userEmail,
      message: req.body.message,
   });
   let data = await contacts.save();
   res.send({ message: "Contacts Saved Successfully", item: data });
});

module.exports = router;
