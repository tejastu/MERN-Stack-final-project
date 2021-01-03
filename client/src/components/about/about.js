import React from "react";
import "./about.css";

function About() {
   return (
      <div className='about-section'>
         <div className='inner-container'>
            <h1>About Us</h1>
            <p className='text'>
               TT Electronics is an online superstore for new and used
               Electronics products. From laptops, mobiles, and televisons to
               watches, earphones, and Powerbanks, shoppers can browse and buy a
               wide variety of electronics . After migrating to BigCommerce,
               Discount Electronics was able to improve its customers’ shopping
               experience, immediately increase conversions by 10% by
               integrating Amazon Pay, and achieve peace of mind around PCI
               compliance.
            </p>
            <div className='skills'>
               <span>Contact Us</span>
               <span>Sales</span>
               <span>Services</span>
            </div>
         </div>
      </div>
   );
}

export default About;
