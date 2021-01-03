export const cartUtility = (oldstate, nextaction) => {
   const existingcartItem = oldstate.find(
      (data) => data.product._id === nextaction.product._id
   );
   if (existingcartItem) {
      return oldstate.map((cartItem) => {
         return cartItem.product._id === nextaction.product._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
      });
   } else {
      return [...oldstate, { ...nextaction, quantity: 1 }];
   }
};

export const addQuantityUtility = (oldstate, updatestate) => {
   const existingcartItem = oldstate.find(
      (data) => data.product._id === updatestate._id
   );
   if (existingcartItem) {
      existingcartItem.quantity += 1;
   } else {
      return [...oldstate];
   }
};

export const removeQuantityUtility = (oldstate, removestate) => {
   const existingcartItem = oldstate.find(
      (data) => data.product._id === removestate._id
   );
   if (existingcartItem === 1) {
      oldstate.filter((data) => data.product._id !== removestate._id);
   } else {
      existingcartItem.quantity -= 1;
      return [...oldstate];
   }
};
