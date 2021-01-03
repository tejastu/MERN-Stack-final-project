import React, { Component } from "react";
import "./navigation.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import {
   Navbar,
   Nav,
   Form,
   Button,
   FormControl,
   NavDropdown,
} from "react-bootstrap";
import { logout, UserLogged } from "../../redux/action/user/user";
import { Link } from "react-router-dom";
import { colors } from "@material-ui/core";
import { navigateToCart } from "../../redux/action/products/product";

class Navigation extends Component {
   constructor(props) {
      // @ts-ignore
      super(props);
      console.log(props);
   }
   render() {
      console.log(this.props);

      return (
         <div className='header'>
            <Link to='/home'>
               <img
                  className='header__logo'
                  src='https://www.ept.ca/wp-content/uploads/2020/09/TT-Electronics-670x280.png'
               />
            </Link>

            <div className='header__search'>
               <input className='header__searchInput' type='text' />
               <SearchIcon className='header__searchIcon' />
            </div>

            <Nav.Link
               style={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "600",
               }}
               className='contactus'
               as={Link}
               to='/contact'
            >
               Contact Us
            </Nav.Link>

            <Nav.Link
               style={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "600",
               }}
               className='aboutus'
               as={Link}
               to='/about'
            >
               About Us
            </Nav.Link>

            <React.Fragment>
               {this.props.loggeduser.user ? (
                  <Nav>
                     <div className='cart'>
                        <button
                           type='button'
                           className='btn btn-primary'
                           onClick={() => this.props.navigateToCart()}
                        >
                           <i
                              className='fa fa-cart-plus fa-2x'
                              aria-hidden='true'
                              style={{ fontSize: "20px", fontWeight: "800" }}
                           >
                              _Cart
                           </i>{" "}
                           {this.props.cartData.storedata.length > 0 ? (
                              <span className='badge badge-light'>
                                 {this.props.cartData.storedata.length}
                              </span>
                           ) : null}
                        </button>
                     </div>
                     (
                     <Nav.Link
                        as={Link}
                        to={"/login"}
                        onClick={() => this.props.logout()}
                        style={{ fontSize: "20px", fontWeight: "800" }}
                     >
                        Logout
                     </Nav.Link>
                     )
                  </Nav>
               ) : (
                  <Nav>
                     <Nav.Link as={Link} to={"/signup"}>
                        SignUp
                     </Nav.Link>
                     <Nav.Link as={Link} to={"/login"}>
                        Login
                     </Nav.Link>
                  </Nav>
               )}
            </React.Fragment>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   console.log(state);
   return { loggeduser: state.login, cartData: state.cart };
};

export default withRouter(
   connect(mapStateToProps, { logout, navigateToCart, UserLogged })(Navigation)
);
