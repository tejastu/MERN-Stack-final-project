let express = require("express");
let mongoose = require("mongoose");
let port = process.env.PORT || 6900;
let userAuth = require("./routes/api/userAuthApi");
let product = require("./routes/api/productApi");
let contact = require("./routes/api/contactApi");
let mailer = require("./routes/api/mailer");
let forgotpassword = require('./routes/api/forgot.password')

// let mailer = require("./routes/api/mailer");

let app = express();
let cors = require("cors");
let morgan = require("morgan");
// require("./refactor/path")(app);

let config = require("config");
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

if (!config.get("jwtPrivateKey")) {
   console.error("FATAL ERROR !!, jwtPrivateKey is not defined");
   process.exit(1);
}


// app.use(function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "http://localhost:6900");
//    res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//    );
//    next();
// });
mongoose
   .connect("mongodb://localhost:27017/Gada_Electronics", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("Connected to Database"))
   .catch((error) => console.log(`Something went wrong ${error.message}`));

app.use("/api/", userAuth);
app.use("/api/", product);
app.use("/api", contact);
app.use("/api", mailer);
app.use("/api", forgotpassword);


if (process.env.NODE_ENV == "production") {
   app.use(express.static("client/build"));

   app.get("*", (req, res) => {
      res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
   });
}

app.listen(port, () => console.log(`Your port is Running on ${port}`));
