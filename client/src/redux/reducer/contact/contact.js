import { CONTACT_INFO, ERROR } from "../../action/contact/contact.type";

export const sendContactData = (state = {}, action) => {
   switch (action.type) {
      case CONTACT_INFO:
         return { ...state, item: action.payload };
      case ERROR:
         return { error_message: action.payload };
      default:
         return state;
   }
};
