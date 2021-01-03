import axios from "axios";
const ContactDetails_ENDPOINT = "http://localhost:6900/api/sendMail";
let config = {
   header: {
      "Content-Type": "application/json",
   },
};

export const contactInfo = (data) => {
   return axios.post(ContactDetails_ENDPOINT, data, config);
};
