const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

let contactSchema = new mongoose.Schema({
   fname: { type: String, required: true, min: 4, max: 50 },
   subject: { type: String, required: true, min: 3, max: 100 },
   userEmail: { type: String, required: true, min: 3, max: 50, email: true },
   message: { type: String, required: true, min: 5, max: 100 },
});
let contactModel = mongoose.model("contactus", contactSchema);

function contactValidation(msg) {
   let schemas = Joi.object({
      fname: Joi.string().required().min(4).max(50),
      subject: Joi.string().required().min(3).max(100),
      userEmail: Joi.string().required().min(3).max(50).email(),
      message: Joi.string().required().min(5).max(100),
   });
   return schemas.validate(msg);
}
module.exports = { contactModel, contactValidation };
