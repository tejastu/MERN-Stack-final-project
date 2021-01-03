import React from "react";
import "./productTemp.css";
import { withRouter } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Product = (props) => {
   let { datas } = props;

   return (
      <div className='row'>
         <div className='flip-card'>
            <div className='flip-card-inner'>
               <div className='flip-card-front'>
                  <img src={datas.image} />
                  <br />
                  <h3>
                     <b>Offer Price:{datas.offerPrice}</b>
                  </h3>
                  <h5>
                     Price:<strike>{datas.price}</strike>
                  </h5>
               </div>
               <div className='flip-card-back'>
                  <div class='back-header'>
                     <img src={datas.image} />
                  </div>
                  <div className='back-footer'>
                     <h2>{datas.name}</h2>

                     <a
                        href='#'
                        onClick={() =>
                           props.history.push(`/shopproduct/${datas._id}`)
                        }
                     >
                        Check Product
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default withRouter(Product);
