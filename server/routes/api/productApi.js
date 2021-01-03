const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

let Model = require("../schema/productModel");
let productModel = Model.productModel;
let Category = Model.Category;

router.post("/addcategory", async (req, res) => {
   let cat = new Category(req.body);
   cat = await cat.save();
   res.send({ message: "success", data: cat });
});

router.get("/allcategory", async (req, res) => {
   let data = await cat.find();
   res.send({ d: data });
});

router.get("/findcategory/:id", async (req, res) => {
   let cat = await cat.findById(req.params.id);
   if (!cat) {
      return res.status(404).send({ message: "Invalid Category id" });
   }
   res.send({ u: user });
});

router.delete("/deletecategory/:id", async (req, res) => {});

//CRUD Operation on Products
router.post("/addProduct", async (req, res) => {
   let newProduct = new productModel({
      name: req.body.name,
      price: req.body.price,
      offerPrice: req.body.offerPrice,
      description: req.body.description,
      category: req.body.category,
      subCategory: req.body.subCategory,
      image: req.body.image,
   });
   await newProduct.save();
   res.send({ message: "Product added Successfully" });
});

router.put("/update/:id", async (req, res) => {});

router.delete("/remove/:id", async (req, res) => {});

router.get("/allProduct", async (req, res) => {
   let alldata = await productModel.find();
   res.send({ product: alldata });
});

router.get("/fetchProductById/:id", async (req, res) => {
   let data = await productModel.findById(req.params.id);
   res.send({ product: data });
});

router.get("/removeProductbyid/:id", async (req, res) => {
   let data = await productModel.findByIdAndRemove(req.params.id);
   console.log(data);
   res.send({ product: data });
});

//Pagination
router.get("/page/:pageIdx", async (req, res) => {
   let pageSize = 6; // max products in one page
   let page = parseInt(req.params.pageIdx) || 1;
   if (page < 0 || page == 0) {
      return res.status(403).send("Invalid Page Number, should Start with 1");
   }
   let products = await productModel
      .find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
   let collectionSize = await productModel.count();
   if (!products) {
      return res.status(403).send("Data not found");
   }
   res.send({
      message: "success",
      data: products,
      page: page,
      pageSize: pageSize,
      collectionSize: collectionSize,
   });
});

router.get("/product/:id", async (req, res) => {
   let product = await productModel.findById(req.params.id);
   if (!product) {
      return res.status(403).send("Product is Unavailable");
   }
   res.send({ message: "success", data: product });
});

//http:localhost/api/category/SAMSUNG/page/2
router.get("/category/:category/page/:pageIdx", async (req, res) => {
   let pageSize = 3;
   let page = parseInt(req.params.pageIdx) || 1;
   if (page < 0 || page == 0) {
      return res.status(403).send("Invalid Page Number,should Start with 1");
   }
   let filterproducts = await productModel.find({
      category: req.params.category,
   }); // comes from URL /:category
   let collectionSize = filterproducts.length; //calculate length of products of (SAMSUNG) category
   let products = await productModel
      .find({ category: req.params.category })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
   if (!products) {
      return res.status(403).send("Product not Found");
   }
   res.send({
      message: "success",
      data: products,
      page: page,
      pageSize: pageSize,
      collectionSize: collectionSize,
   });
});

//http:localhost/api/category/SAMSUNG/subcategory/Fridge/page/2
router.get(
   "/category/:category/subcategory/:subCategory/page/:pageIdx",
   async (req, res) => {
      let pageSize = 3;
      let page = parseInt(req.params.pageIdx) || 1;
      if (page < 0 || page == 0) {
         return res
            .status(403)
            .send("Invalid Page Number, should Start with 1");
      }
      let filterproducts = await productModel.find({
         category: req.params.category,
         subCategory: req.params.subCategory,
      });
      let collectionSize = filterproducts.length;
      let products = await productModel
         .find({
            category: req.params.category,
            subCategory: req.params.subCategory,
         })
         .skip(pageSize * (page - 1))
         .limit(pageSize);
      if (!products) {
         return res.status(403).send("Product not Found");
      }
      res.send({
         message: "success",
         data: products,
         page: page,
         pageSize: pageSize,
         collectionSize: collectionSize,
      });
   }
);

router.get("/latestProduct", async (req, res) => {
   let products = await productModel.find().limit(8);
   if (!products) {
      return res.status(403).send("Product not Found");
   }
   res.send({ message: "success", data: products });
});

router.get("/offerProduct", async (req, res) => {
   let products = await productModel.find({ isTodayOffer: true }).limit(8);
   if (!products.data) {
      res.send({ message: "success", data: products });
   } else {
      res.send({ message: "Products not Found" });
   }
});

// function validationError(message) {
//    let schema = Joi.object().keys({
//       name: Joi.string().min(3).max(100).required(),
//       image: Joi.string().min(3).max(100).required(),
//       description: Joi.string().min(3).max(1000).required(),
//       price: Joi.number().min(1).required(),
//       offerPrice: Joi.number.min(1).required(),
//       isAvailable: Joi.boolean.required(),
//       isTodayOffer: Joi.boolean.required(),
//       category: Joi.string.min(3).max(100).required(),
//       subCategory: Joi.string.min(3).max(100).required(),
//       isAdmin: Joi.boolean(),
//       recordDate: Joi.date(),
//       updateDate: Joi.date(),
//    });
//    return Joi.validate(message, schema);
// }

module.exports = router;
