import React, { Component } from "react";
import { connect } from "react-redux";
import { productInfo } from "../../redux/action/products/product";
import Product from "../home/productTemp";
import Contact from "../contact/contact";
import "./home.css";
import { Advertisement } from "semantic-ui-react";
import { Jumbotron, Button, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
class Home extends Component {
   componentDidMount() {
      this.props.productInfo();
   }
   render() {
      if (this.props.loading) {
         return <div className='loader'></div>;
      }
      if (!this.props.items) {
         return null;
      }
      return (
         <React.Fragment>
            <div className='banner'>
               <figure>
                  <img src='https://i.ytimg.com/vi/2sXooi_y-MI/maxresdefault.jpg' />
                  <img src='https://www.gizmochina.com/wp-content/uploads/2020/07/oneplus-nord-preorder-india.png' />
                  <img src='https://incitrio.com/wp-content/uploads/2015/07/Screen-Shot-2015-07-06-at-9.19.22-AM.png' />
                  <img src='https://i.ytimg.com/vi/kIuk-eQUiZY/maxresdefault.jpg' />
                  <img src='https://i.ytimg.com/vi/2sXooi_y-MI/maxresdefault.jpg' />
               </figure>
            </div>

            <div className='offer'>
               <Jumbotron>
                  <h1>Today's Offer</h1>
                  <p>
                     Upto 30 to 50 % off on Mobiles, Cameras, Watches and Many
                     more...
                     <h1>Grab it Now</h1>
                  </p>
                  {/* <p>
                     <Button variant='primary'>Learn more</Button>
                  </p> */}
               </Jumbotron>
            </div>

            <div className='row'>
               {this.props.items.product.map((item) => (
                  <div
                     className='col-md-2 mt-6'
                     style={{ display: "flex" }}
                     key={item._id}
                  >
                     {<Product datas={item} {...this.props} />}
                  </div>
               ))}
            </div>
            <Contact />

            <footer className='footer'>
               <div className='footer-left'>
                  <img
                     src='https://www.ept.ca/wp-content/uploads/2020/09/TT-Electronics-670x280.png'
                     alt=''
                  />
                  <p>
                     TT Electronics’s state-of-the-art electronic products are
                     known worldwide for their quality, value, and design. This
                     site is dedicated to the company’s line of televisions and
                     includes a wide range of sizes and features.
                  </p>
                  <br />
                  <div className='socials'>
                     <a href='#'>
                        <i className='fa fa-facebook'></i>
                     </a>
                     <a href='#'>
                        <i className='fa fa-twitter'></i>
                     </a>
                     <a href='#'>
                        <i className='fa fa-dribbble'></i>
                     </a>
                     <a href='#'>
                        <i className='fa fa-youtube'></i>
                     </a>
                     <a href='#'>
                        <i className='fa fa-tumblr'></i>
                     </a>
                  </div>
               </div>
               <ul className='footer-right'>
                  <li>
                     <h2>Product</h2>
                     <ul className='box'>
                        <li>
                           <a href='#'>Mobiles</a>
                        </li>
                        <li>
                           <a href='#'>Laptops</a>
                        </li>
                        <li>
                           <a href='#'>Cameras</a>
                        </li>
                        <li>
                           <a href='#'>Watches</a>
                        </li>
                     </ul>
                  </li>
                  <li className='features'>
                     <h2>Useful Links</h2>
                     <ul className='box'>
                        <li>
                           <a href='#'>Blog</a>
                        </li>
                        <li>
                           <a href='#'>Pricing</a>
                        </li>
                        <li>
                           <a href='#'>Sales</a>
                        </li>
                        <li>
                           <a href='#'>Customer Services</a>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <h2>Address</h2>
                     <ul className='box'>
                        <li>
                           <a href='#'>2B-137, R-City Mall</a>
                        </li>
                        <li>
                           <a href='#'>LBS Road</a>
                        </li>
                        <li>
                           <a href='#'>Mumbai, Maharashatra</a>
                        </li>
                        <li>
                           <a href='#'>India</a>
                        </li>
                     </ul>
                  </li>
               </ul>
               <div className='footer-bottom'>
                  <p>All Rights Reserved by &copy;TTElectronics 2020</p>
               </div>
            </footer>
         </React.Fragment>
      );
   }
}

const mapStateToProps = (state) => {
   console.log(state);
   return { items: state.products.items, loading: state.products.loading };
};
export default connect(mapStateToProps, { productInfo })(Home);
