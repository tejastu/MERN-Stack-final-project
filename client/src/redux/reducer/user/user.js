import {
   USER_REGISTER,
   ERROR,
   LOGIN_USER,
   PRE_LOADER,
   LOGGED_USER,
} from "../../action/user/user.type";

const INITIAL_STATE = () => {
   let user = JSON.parse(localStorage.getItem("currentuser"));
   return user ? { loggedin: true, user } : {};
};

export const LoginUser = (state = INITIAL_STATE(), action) => {
   console.log(action);
   switch (action.type) {
      case LOGIN_USER:
         return { ...state, user: action.payload, loggedin: false };
      case ERROR:
         return { message_error: action.payload, loggedin: false };
      case PRE_LOADER:
         return { loggedin: true };
      case LOGGED_USER:
         return { currentuserdata: action.payload, loggedin: false };

      default:
         return state;
   }
};

export const registerUser = (state = {}, action) => {
   console.log(action, "reducer");
   switch (action.type) {
      case USER_REGISTER:
         return { ...state, item: action.payload };
      case ERROR:
         return { message_error: action.payload };

      default:
         return state;
   }
};
