import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./cart.css";
import {
   addQuantity,
   removeQuantity,
   removetoCart,
} from "../../redux/action/products/product";
class Cart extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      if (this.props.loading) {
         return <div className='loader'></div>;
      }
      if (this.props.cartItem.storedata.length > 0) {
         return (
            <div className='small-container cart-page'>
               <table>
                  <tr>
                     <th>Product</th>
                     <th>Quantity</th>
                     <th>Subtotal</th>
                  </tr>
                  {this.props.cartItem.storedata.map((data) => (
                     <tr key={data.product._id}>
                        <td>
                           <div className='cart-info'>
                              <img src={data.product.image} />
                              <div>
                                 <p style={{ fontSize: "large" }}>
                                    <b>{data.product.name}</b>
                                 </p>
                                 <div className='flex'>
                                    <small style={{ fontSize: "130%" }}>
                                       Price : {data.product.offerPrice}
                                    </small>

                                    <button
                                       className='btn btn-danger'
                                       style={{
                                          marginLeft: "37px",
                                          marginTop: "-6px",
                                       }}
                                       onClick={() =>
                                          this.props.removetoCart(
                                             data.product._id
                                          )
                                       }
                                    >
                                       Remove
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td>
                           <i
                              className='fa fa-chevron-circle-up'
                              onClick={() =>
                                 this.props.addQuantity(data.product)
                              }
                           ></i>
                           <span style={{ fontSize: "large", padding: "7px" }}>
                              {data.quantity}
                           </span>
                           <i
                              className='fa fa-chevron-circle-down'
                              onClick={() =>
                                 this.props.removeQuantity(data.product)
                              }
                           ></i>
                        </td>
                        <td style={{ fontSize: "large" }}>
                           {data.product.offerPrice}
                        </td>
                     </tr>
                  ))}
               </table>

               <div className='total-price'>
                  <table>
                     <tr>
                        <td style={{ fontSize: "25px" }}>
                           <b>Total</b>
                        </td>
                        <td style={{ fontSize: "25px" }}>
                           <b>{this.props.total}</b>
                        </td>
                     </tr>
                  </table>
               </div>
               <div className='buttons'>
                  <td>
                     <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => this.props.history.push("/home")}
                     >
                        Continue Shopping
                     </button>
                  </td>
                  <td>
                     <button type='button' className='btn btn-success'>
                        Checkout{" "}
                        <span className='glyphicon glyphicon-play'></span>
                     </button>
                  </td>
               </div>
            </div>
         );
      } else {
         return <h1>EMPTY CART!!!!!!</h1>;
      }
   }
}

const mapStateToProps = (state) => {
   console.log(state);
   return {
      loading: state.cart.storedata.loading,
      cartItem: state.cart,
      total: state.cart.storedata.reduce(
         (accumlator, nextState) =>
            accumlator + nextState.product.offerPrice * nextState.quantity,
         0
      ),
   };
};
export default withRouter(
   connect(mapStateToProps, {
      addQuantity,
      removeQuantity,
      removetoCart,
   })(Cart)
);
