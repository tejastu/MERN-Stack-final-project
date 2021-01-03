const mongoose = require("mongoose");

let subCategorySchema = new mongoose.Schema({
   name: { type: String, required: true, minlength: 3, maxlength: 100 },
});
let subCategory = mongoose.model("subcategory", subCategorySchema);

let categorySchema = new mongoose.Schema({
   catName: { type: String, required: true, minlength: 3, maxlength: 100 },
   subcat: [subCategorySchema],
});

let Category = mongoose.model("Category", categorySchema);

let productSchema = new mongoose.Schema({
   name: { type: String, minlength: 3, maxlength: 100 },
   image: { type: String, minlength: 3, maxlength: 1000 },
   description: { type: String, minlength: 3, maxlength: 1000 },
   price: { type: Number, minlength: 1 },
   offerPrice: { type: Number, minlength: 1 },
   isAvailable: { type: Boolean },
   isTodayOffer: { type: Boolean },
   category: { type: String, minlength: 3, maxlength: 100 },
   subCategory: { type: String, minlength: 2, maxlength: 100 },
   isAdmin: { type: Boolean },
   recordDate: { type: Date, default: Date.now },
   updateDate: { type: Date, default: Date.now },
});

let productModel = mongoose.model("productRecord", productSchema);

module.exports = { productModel, Category, subCategory };
