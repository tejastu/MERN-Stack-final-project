import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import "./signup.css";
import { required } from "@hapi/joi";
import { connect } from "react-redux";
import { UserRegister } from "../../redux/action/user/user";

class Signup extends Component {
   constructor() {
      super();
      this.state = {
         FirstName: "",
         LastName: "",
         UserLogin: {
            EmailId: "",
            password: "",
         },
      };
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
   }

   setFirstName = (e) => this.setState({ FirstName: e.target.value });
   setLastName = (e) => this.setState({ LastName: e.target.value });

   setEmail = (e) => {
      let a = Object.assign({}, this.state.UserLogin);
      console.log(a);
      a.EmailId = e.target.value;
      this.setState({ UserLogin: a });
   };
   setPassword = (e) => {
      let b = Object.assign({}, this.state.UserLogin);
      console.log(b);
      b.password = e.target.value;
      this.setState({ UserLogin: b });
   };

   formhandlesubmit = (e) => {
      e.preventDefault();
      if (this.validator.allValid()) {
         let item = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            UserLogin: {
               EmailId: this.state.UserLogin.EmailId,
               password: this.state.UserLogin.password,
            },
         };
         console.log(item);
         this.props.UserRegister(item);
      } else {
         this.validator.showMessages();
         this.forceUpdate();
      }
   };

   inputDatahandle = (e) => {
      console.log(e.target.value);
      this.setState({ [e.target.name]: e.target.value });
   };

   render() {
      return (
         <div className='login'>
            <Link to='/'>
               <img
                  className='login__logo'
                  src='https://www.ept.ca/wp-content/uploads/2020/09/TT-Electronics-670x280.png'
               />
            </Link>

            <div className='login__container'>
               <h1>Sign-up</h1>
               <form onSubmit={this.formhandlesubmit}>
                  <h5>FirstName</h5>
                  <input
                     type='text'
                     value={this.state.FirstName}
                     name='FirstName'
                     placeholder='Enter Firstname'
                     onChange={this.setFirstName}
                  />
                  {this.validator.message(
                     "FirstName",
                     this.state.FirstName,
                     "required"
                  )}

                  <h5>LastName</h5>
                  <input
                     type='text'
                     value={this.state.LastName}
                     name='LastName'
                     placeholder='Enter Lastname'
                     onChange={this.setLastName}
                  />
                  {this.validator.message(
                     "LastName",
                     this.state.LastName,
                     "required"
                  )}
                  <h5>E-mail</h5>
                  <input
                     type='text'
                     value={this.state.UserLogin.EmailId}
                     name='EmailId'
                     placeholder='Enter E-mail Id'
                     onChange={this.setEmail}
                  />
                  {this.validator.message(
                     "EmailId",
                     this.state.UserLogin.EmailId,
                     "required"
                  )}

                  <h5>Password</h5>
                  <input
                     type='password'
                     value={this.state.UserLogin.password}
                     name='password'
                     placeholder='Enter Password'
                     onChange={this.setPassword}
                  />
                  {this.validator.message(
                     "password",
                     this.state.UserLogin.password,
                     "required"
                  )}
                  <button
                     type='submit'
                     // onClick={signIn}
                     className='login__signInButton'
                  >
                     Register
                  </button>

                  <p>
                     By signing-in you agree to the TT Electronics Conditions of
                     Use & Sale. Please see our Privacy Notice, our Cookies
                     Notice and our Interest-Based Ads Notice.
                  </p>
                  <h6>Already have an account</h6>
                  <Link to='/login'>
                     <button
                        //   onClick={register}
                        className='login__registerButton'
                     >
                        Login
                     </button>
                  </Link>
               </form>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   // console.log(state.register_info, "maptostate");
   return { error: state.register_info.message_error };
   // return state;
};
export default connect(mapStateToProps, { UserRegister })(Signup);
