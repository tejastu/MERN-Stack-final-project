import React, { Component } from "react";
import "./forgotpassword.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ForgotPasswordAction } from "../../redux/action/forgotpassword/forgotpassword";
import SimpleReactValidator from "simple-react-validator";

class ForgotPassword extends Component {
   constructor(props) {
      super(props);
      this.state = {
         EmailId: "",
      };
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
   }

   handleFormSubmit = (e) => {
      e.preventDefault();
      if (this.validator.allValid()) {
         let data = {
            EmailId: this.state.EmailId,
         };
         this.props.ForgotPasswordAction(data);
      } else {
         this.validator.showMessages();
         this.forceUpdate();
      }
   };

   handleInput = (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      });
   };

   render() {
      return (
         <div
            className='container'
            style={{ marginTop: "120px", marginLeft: "400px" }}
         >
            <div className='col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3'>
               <form
                  role='form'
                  className='sign_up_form'
                  onSubmit={this.handleFormSubmit}
               >
                  <h2 className='sign_up_title'>Reset password</h2>
                  <p>Check you MailBox after entering EmailId</p>
                  <div className='form-group'>
                     <input
                        type='email'
                        name='EmailId'
                        id='EmailId'
                        className='form-control input-lg'
                        placeholder='Email address'
                        tabindex='4'
                        value={this.state.EmailId}
                        onChange={this.handleInput}
                     />
                     {this.validator.message(
                        "Email Id",
                        this.state.EmailId,
                        "required|EmailId"
                     )}
                  </div>
                  <div className='row'>
                     <div className='col-xs-12 col-md-12'>
                        <Link
                           to='/home'
                           onClick={this.handleFormSubmit}
                           className='btn btn-success btn-block btn-lg'
                           style={{ background: "#658ee7" }}
                        >
                           Reset
                        </Link>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   console.log(state);
   return state;
};
export default connect(mapStateToProps, { ForgotPasswordAction })(
   ForgotPassword
);
