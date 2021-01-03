import React from "react";
import { Route, Redirect } from "react-router-dom";
import { stat } from "fs";

const PrivateRoute = (props) => {
   //   console.log(rest);
   console.log(props);
   let { component: Component, ...rest } = props;
   return (
      <Route
         {...rest}
         render={(props) => {
            return localStorage.getItem("currentuser") ? (
               <Component {...props} />
            ) : (
               <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
               />
            );
         }}
      />
   );
};
export default PrivateRoute;
