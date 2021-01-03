import { addQuantity } from "../../action/products/product";
import {
   cartUtility,
   addQuantityUtility,
   removeQuantityUtility,
} from "../../reducer/product/cart.utility";
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
} from "../../action/products/product.type";
export const showproductDetails = (state = {}, action) => {
   switch (action.type) {
      case LOADING:
         return { loading: true };

      case FETCH_PRODUCT_DATA:
         return { ...state, items: action.payload, loading: false };
      default:
         return state;
   }
};

export const showproductDetailsId = (state = {}, action) => {
   switch (action.type) {
      case LOADING:
         return { loading: true };

      case FETCH_PRODUCT_DATA_ID:
         return { ...state, items: action.payload, loading: false };
      default:
         return state;
   }
};

const INITIAL_STATE = {
   storedata: [],
};

export const addtoCart = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case LOADING:
         return { ...state, loading: true };
      case NAVIGATE_CART:
         return { ...state, loading: false };
      case ADD_CART:
         return {
            ...state,
            storedata: cartUtility(state.storedata, action.payload),
            loading: false,
         };
      case REMOVE_CART:
         return {
            ...state,
            storedata: state.storedata.filter(
               (data) => data.product._id !== action.payload.product._id
            ),
            loading: false,
         };
      case ADD_QUANTITY:
         return {
            ...state,
            loading: false,
            addquantity: addQuantityUtility(state.storedata, action.payload),
         };
      case REMOVE_QUANTITY:
         return {
            ...state,
            loading: false,
            addquantity: removeQuantityUtility(state.storedata, action.payload),
         };
      default:
         return state;
   }
};
