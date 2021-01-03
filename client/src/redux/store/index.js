import { combineReducers } from "redux";
import { registerUser, LoginUser } from "../reducer/user/user";
import { sendContactData } from "../reducer/contact/contact";
import { forgotPassword } from "../reducer/forgotpassword/forgotpassword";
import storage from "redux-persist/lib/storage";
import {
   showproductDetails,
   showproductDetailsId,
   addtoCart,
} from "../reducer/product/product";

// import {
//   ShowProducts,
//   ShowProductById,
//   AddToCart,
//   ShowProductByCategory,
//   FetchPagination
// } from "../reducer/products/products";
// import { ForgetPass } from "../reducer/password/password";
// import { ContactSend } from "../reducer/contact/contact";

const reducers = combineReducers({
   register_info: registerUser,
   login: LoginUser,
   products: showproductDetails,
   product: showproductDetailsId,
   cart: addtoCart,
   Contactus: sendContactData,
   forgotpassword: forgotPassword,
   //   details: ShowProducts,
   //   shopProducts: ShowProductById,
   //   cart: AddToCart,
   //   contact: ContactSend,
   //   fetchproductsByCategory: ShowProductByCategory,
   //   pass: ForgetPass,
   //   pagination: FetchPagination
   // usercart: AddToUserCart
});
// fetchproductsByCategory: ShowProductByCategory

export default reducers;
export const persistConfig = {
   key: "root",
   storage,
   whitelist: ["cart"],
};
