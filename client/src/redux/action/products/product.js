import { fetchProduct, fetchProductById } from "../../api/product";
import {
   FETCH_PRODUCT_DATA,
   LOADING,
   FETCH_PRODUCT_DATA_ID,
   SHOW_ERROR,
   ADD_CART,
   REMOVE_CART,
   ADD_QUANTITY,
   REMOVE_QUANTITY,
   NAVIGATE_CART,
} from "../products/product.type";

import { history } from "../../../helpers/history/index";

export const productInfo = () => {
   return async (dispatch) => {
      try {
         dispatch({ type: LOADING });
         let response = await fetchProduct();
         setTimeout(() => {
            dispatch({ type: FETCH_PRODUCT_DATA, payload: response.data });
         }, 2000);
      } catch (error) {
         dispatch({ type: SHOW_ERROR, payload: error.response.data });
      }
   };
};

export const productInfoById = (id) => {
   return async (dispatch) => {
      try {
         dispatch({ type: LOADING });
         let response = await fetchProductById(id);
         setTimeout(() => {
            dispatch({ type: FETCH_PRODUCT_DATA_ID, payload: response.data });
         }, 2000);
      } catch (error) {
         dispatch({ type: SHOW_ERROR, payload: error.response.data });
      }
   };
};

export const addtoCart = (id) => {
   return async (dispatch) => {
      try {
         dispatch({ type: LOADING });
         let response = await fetchProductById(id);
         setTimeout(() => {
            dispatch({ type: ADD_CART, payload: response.data });
         }, 1000);
      } catch (error) {
         dispatch({ type: SHOW_ERROR, payload: error.response.data });
      }
   };
};

export const removetoCart = (id) => {
   return async (dispatch) => {
      try {
         dispatch({ type: LOADING });
         let response = await fetchProductById(id);
         setTimeout(() => {
            dispatch({ type: REMOVE_CART, payload: response.data });
            history.push("/cart");
            window.location.reload();
         }, 1000);
      } catch (error) {
         // dispatch({ type: SHOW_ERROR, payload: error.response.data });
      }
   };
};

export const addQuantity = (data) => {
   return async (dispatch) => {
      try {
         dispatch({ type: LOADING });

         setTimeout(() => {
            dispatch({ type: ADD_QUANTITY, payload: data });
         }, 1000);
      } catch (error) {
         dispatch({ type: SHOW_ERROR, payload: error });
      }
   };
};

export const removeQuantity = (data) => {
   return async (dispatch) => {
      try {
         dispatch({ type: LOADING });

         setTimeout(() => {
            dispatch({ type: REMOVE_QUANTITY, payload: data });
         }, 1000);
      } catch (error) {
         dispatch({ type: SHOW_ERROR, payload: error });
      }
   };
};

export const navigateToCart = () => {
   return async (dispatch) => {
      dispatch({ type: NAVIGATE_CART });
      history.push("/cart");
      window.location.reload();
   };
};
