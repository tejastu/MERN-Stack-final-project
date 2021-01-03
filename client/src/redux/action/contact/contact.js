import { CONTACT_INFO, ERROR } from "../contact/contact.type";
import { contactInfo } from "../../api/contact";
import { history } from "../../../helpers/history/index";

export const addContact = (item) => {
   return async (dispatch) => {
      try {
         let contactDetails = await contactInfo(item);
         dispatch({ type: CONTACT_INFO, payload: contactDetails.data });
         alert("Thank You..Come Again!!");
         history.push("/home");
         window.location.reload();
      } catch (ex) {
         dispatch({ type: ERROR, payload: ex.response.data });
      }
   };
};
