import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LoginUser } from "../../redux/action/user/user";

class Login extends Component {
   constructor() {
      // @ts-ignore
      super();
      this.state = {
         UserLogin: {
            EmailId: "",
            password: "",
         },
      };
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
   }

   setEmailId = (e) => {
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

   handleInput = (e) => {
      e.preventDefault();
      if (this.validator.allValid()) {
         let data = {
            UserLogin: {
               EmailId: this.state.UserLogin.EmailId,
               password: this.state.UserLogin.password,
            },
         };
         console.log(data);
         this.props.LoginUser(data);
      } else {
         this.validator.showMessages();
         this.forceUpdate();
      }
   };
   // Inputdata = (e) => {
   //    this.setState({ [e.target.name]: e.target.value });
   // };

   // alertMessage = (data) => {
   //    this.setState({ data: data });
   // };

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
               <h1>Sign-In</h1>
               <form onSubmit={this.handleInput}>
                  <h5>E-mail</h5>
                  <input
                     type='text'
                     value={this.state.UserLogin.EmailId}
                     name='EmailId'
                     placeholder='Enter E-mail Id'
                     onChange={this.setEmailId}
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
                     Login
                  </button>

                  <button
                     className='fp'
                     style={{
                        marginTop: "25px",
                        border: "none",
                        backgroundColor: "transparent",
                     }}
                  >
                     <a href='http://localhost:3000/forgotpassword'>
                        Forgot Password?
                     </a>
                  </button>

                  <p>
                     By signing-in you agree to the TT Electronics Conditions of
                     Use & Sale. Please see our Privacy Notice, our Cookies
                     Notice and our Interest-Based Ads Notice.
                  </p>
                  <Link to='/signup'>
                     <button
                        //   onClick={register}
                        className='login__registerButton'
                     >
                        Create your Account
                     </button>
                  </Link>
               </form>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   console.log(state);

   // return { error: state.login };
   return { error: state.login.message_error, user: state.login };

   // return { user: state.login };
};

export default connect(mapStateToProps, { LoginUser })(Login);
