import axios from "axios";

const ForgotPasswordURL = "http://localhost:6900/api/forgotpassword/:token";

const config = {
   headers: {
      "Content-Type": "application/json",
   },
};

export const forgotPassword = (data) => {
   console.log(JSON.stringify(data));
   return axios.post(ForgotPasswordURL, JSON.stringify(data), config);
};
