import axios from "axios";

const PRODUCT_ENDPOINT = "http://localhost:6900/api/allProduct";
const PRODUCT_ENDPOINT_BYID = "http://localhost:6900/api/fetchProductById/";

let config = {
   headers: {
      "Content-type": "application/json",
   },
};

export const fetchProduct = (data) => {
   return axios.get(PRODUCT_ENDPOINT, JSON.stringify(data), config);
};

export const fetchProductById = (id) => {
   return axios.get(PRODUCT_ENDPOINT_BYID + id, config);
};
