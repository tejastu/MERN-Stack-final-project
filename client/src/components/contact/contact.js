import React, { Component } from "react";
import { connect } from "react-redux";
import { addContact } from "../../redux/action/contact/contact";
import SimpleReactValidator from "simple-react-validator";
import "./contact.css";

class Contact extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fname: "",
         userEmail: "",
         subject: "",
         message: "",
      };
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
   }
   inputData = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };
   handleFormSubmit = (e) => {
      e.preventDefault();
      if (this.validator.allValid()) {
         let item = {
            fname: this.state.fname,
            userEmail: this.state.userEmail,
            subject: this.state.subject,
            message: this.state.message,
         };
         this.props.addContact(item);
         this.setState({ fname: "", userEmail: "", subject: "", message: "" });
      } else {
         this.validator.showMessages();
         this.forceUpdate();
      }
   };
   render() {
      return (
         <div className='contact-section'>
            <h1>Contact Us</h1>

            <div className='border'></div>
            <form
               className='contact-form'
               method='post'
               onSubmit={this.handleFormSubmit}
            >
               <input
                  type='text'
                  className='contact-form-text'
                  placeholder='Your name'
                  name='fname'
                  value={this.state.fname}
                  onChange={this.inputData}
               />
               <input
                  type='email'
                  className='contact-form-text'
                  placeholder='Your email'
                  name='userEmail'
                  value={this.state.userEmail}
                  onChange={this.inputData}
               />
               <input
                  type='text'
                  className='contact-form-text'
                  placeholder='Subject'
                  name='subject'
                  value={this.state.subject}
                  onChange={this.inputData}
               />
               <textarea
                  className='contact-form-text'
                  placeholder='Your message'
                  name='message'
                  value={this.state.message}
                  onChange={this.inputData}
               ></textarea>
               <input type='submit' class='contact-form-btn' value='Send' />
            </form>
         </div>
      );
   }
}
const mapStateToProps = (state) => {
   console.log("state", state);
   return { error: state.Contactus.error_message };
};
export default connect(mapStateToProps, { addContact })(Contact);
