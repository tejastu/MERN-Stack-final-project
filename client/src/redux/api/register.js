import axios from "axios";
import { Header } from "../../helpers/history/header";
const REGISTER_ENDPOINT = "http://localhost:6900/api/register";
const LOGIN_ENDPOINT = "http://localhost:6900/api/login";
const LOGGEDIN_USER_ENDPOINT = "http://localhost:6900/api/me";
let config = {
   headers: {
      "Content-type": "application/json",
   },
};

export const userRegister = (data) => {
   return axios.post(REGISTER_ENDPOINT, JSON.stringify(data), config);
};

export const Login = (data) => {
   return axios.post(LOGIN_ENDPOINT, JSON.stringify(data), config);
};

export const userLoggedin = () => {
   // @ts-ignore
   return axios.get(LOGGEDIN_USER_ENDPOINT, { headers: Header(), config });
};
