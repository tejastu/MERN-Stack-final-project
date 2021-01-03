import "./App.css";
import React from "react";
import Navigation from "./components/navigation/navigation";
import Login from "./components/login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import Home from "./components/home/home";
import Cart from "./components/cart/cart";
import Contact from "./components/contact/contact";
import About from "./components/about/about";

import ForgotPassword from "./components/forgotpassword/forgotpassword";
import ShopProduct from "./components/shop/shopproduct";
import PrivateRoute from "./helpers/history/private.component";

function App() {
   return (
      <React.Fragment>
         <Router>
            <div className='App'>
               <Switch>
                  {/* <Route path='/'>
                     <Navigation />
                     <Home />
                  </Route> */}

                  <Route path='/cart'>
                     <Navigation />
                     <Cart />
                  </Route>

                  <Route path='/contact'>
                     <Navigation />
                     <Contact />
                  </Route>
                  <Route path='/about'>
                     <Navigation />
                     <About />
                  </Route>

                  <Route path='/forgotpassword'>
                     <Navigation />
                     <ForgotPassword />
                  </Route>

                  <Route path='/shopproduct/:id'>
                     <Navigation />
                     <ShopProduct />
                  </Route>

                  <Route path='/signup'>
                     <Navigation />
                     <Signup />
                  </Route>
                  <Route path='/login'>
                     <Navigation />
                     <Login />
                  </Route>

                  <PrivateRoute path='/home'>
                     <Navigation />
                     <Home />
                  </PrivateRoute>
                  <PrivateRoute path='/'>
                     <Navigation />
                     <Login />
                  </PrivateRoute>
               </Switch>
            </div>
         </Router>
      </React.Fragment>
   );
}

export default App;
