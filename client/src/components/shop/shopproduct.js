import React, { Component } from "react";
import { connect } from "react-redux";
import { addtoCart } from "../../redux/action/products/product";
import { productInfoById } from "../../redux/action/products/product";
import { withRouter } from "react-router-dom";
import "./shopproduct.css";
import { Card, Button, Carousel } from "react-bootstrap";
import { isMoment } from "moment";

class ShopProduct extends Component {
   constructor(props) {
      super(props);
   }
   componentDidMount() {
      this.props.productInfoById(this.props.match.params.id);
   }
   addCart = (id) => {
      this.props.addtoCart(id);
      this.props.history.push("/cart");
   };
   render() {
      if (this.props.loading) {
         return <div className='loader'></div>;
      }
      if (!this.props.productInfo) {
         return null;
      }
      return (
         <div className='body'>
            <div className='row' key={this.props.productInfo.product._id}>
               <div className='col-md-5'>
                  <Card
                     style={{ height: "80%", width: "80%", marginLeft: "40px" }}
                  >
                     <img
                        className='d-block w-100'
                        src={this.props.productInfo.product.image}
                     />
                  </Card>
               </div>

               <div className='col-md-7'>
                  <p className='newarrival text-center'>Offer</p>
                  <h2>{this.props.productInfo.product.name}</h2>
                  <p className='description'>
                     {this.props.productInfo.product.description}
                  </p>
                  <img
                     src='https://disappearinginplainsight.files.wordpress.com/2015/10/five-stars-google-image.jpg'
                     className='stars'
                  />
                  <p className='offerPrice'>
                     <h3>
                        Offer Price: {this.props.productInfo.product.offerPrice}
                     </h3>
                  </p>

                  <h5 className='price'>
                     Price:
                     <strike> {this.props.productInfo.product.price}</strike>
                  </h5>

                  <p className='avail'>
                     <b>Availability:</b>
                     In Stock
                  </p>
                  <p className='brand'>
                     <b>Brand:</b>
                     {this.props.productInfo.product.subCategory}
                  </p>

                  <button
                     type='button'
                     style={{
                        background: "#fe980f",
                        color: "#ffffff",
                        "font-size": "15px",
                     }}
                     onClick={() =>
                        this.addCart(this.props.productInfo.product._id)
                     }
                     className='btn btn-default cart'
                  >
                     Add to Cart
                  </button>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   console.log(state);
   return {
      loading: state.product.loading,
      productInfo: state.product.items,
   };
};

export default withRouter(
   connect(mapStateToProps, { productInfoById, addtoCart })(ShopProduct)
);
