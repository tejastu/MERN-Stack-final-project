import {
   USER_REGISTER,
   ERROR,
   LOGOUT,
   LOGIN_USER,
   LOGGED_USER,
   PRE_LOADER,
   ADD_USERCART,
} from "./user.type";
import { userRegister, Login, userLoggedin } from "../../api/register";
import { history } from "../../../helpers/history/index";

export const LoginUser = (item) => {
   // alert(JSON.stringify(item))
   return async (dispatch) => {
      try {
         let user = await Login(item);
         console.log(user);
         localStorage.setItem("currentuser", JSON.stringify(user));
         dispatch({ type: LOGIN_USER, payload: user.data });
         alert("Login Done");
         dispatch({ type: PRE_LOADER });
         history.push("/home");
         window.location.reload();
      } catch (ex) {
         dispatch({ type: ERROR, payload: ex });
      }
   };
};

export const UserRegister = (item) => {
   // alert(JSON.stringify(item))
   return async (dispatch) => {
      try {
         let sendData = await userRegister(item);
         console.log(sendData);
         // alert(JSON.stringify(item))
         dispatch({ type: USER_REGISTER, payload: sendData.data });
         alert("Registration Done");
         history.push("/login");
         window.location.reload();
      } catch (ex) {
         console.log(ex, "action");
         dispatch({ type: ERROR, payload: ex });
      }
   };
};

export const UserLogin = () => {
   return async (dispatch) => {
      try {
         let fetchlogindata = await UserLogin();
         // @ts-ignore
         dispatch({ type: LOGGED_USER, payload: fetchlogindata.data });
         history.push("/home");
         window.location.reload();
      } catch (ex) {
         dispatch({ type: ERROR, payload: ex });
      }
   };
};

export const UserLogged = () => {
   return async (dispatch) => {
      try {
         let response = await userLoggedin();
         dispatch({ type: LOGGED_USER, payload: response.data });
      } catch (error) {
         dispatch({ type: ERROR, payload: error.response });
      }
   };
};

export const logout = () => {
   return async (dispatch) => {
      localStorage.removeItem("currentuser");
      dispatch({ type: "LOGOUT" });
      history.push("/login");
      window.location.reload();
   };
};

// export const AddToUserCart = item => {
//   return async dispatch => {
//     try {
//       // dispatch({ type: LOADING });
//       // let response = await fetchProductsId(id);

//       let response = await AddtoCart(item);
//       console.log(response);

//       setTimeout(() => {
//         dispatch({ type: ADD_USERCART, payload: response.data });

//         history.push("/cart");
//         window.location.reload();
//       }, 1000);
//     } catch (ex) {
//       // dispatch({ type: SHOW_ERROR, payload: ex.response.data });
//     }
//   };
// };
