import {FORGOT_PASSWORD,ERROR} from "./forgotpassword.type";
import {forgotPassword} from "../../api/forgotpassword";
import {history} from "../../../helpers/history/index";

export const ForgotPasswordAction=(item)=>{
   
    return async (dispatch) =>
    {
        try
    {
        console.log("Try block in action.",item);
        let forgotpwddata=await forgotPassword(item);
        console.log(forgotpwddata,"Try block");
        dispatch({type : FORGOT_PASSWORD , payload : forgotpwddata.data }); // Here we are sending data to reducer
        alert("Please check your Email to reset your password");
        history.push("/home");
    }
    catch (ex) {
        dispatch({ type: ERROR, payload: ex.response.data })
    }

    }
    
};
