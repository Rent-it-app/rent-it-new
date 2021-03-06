import React from 'react'
// handled by the router: a home page, an about page, and a users page. As you click around on the different <Link>s,
// the router renders the matching <Route>.

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App'
import Create from './Create';
import SingleItem from './SingleItem'
import UpdateItem from './UpdateItem'
import ContactUs from './ContactUs'

const Routes =()=> {
    return(
        <BrowserRouter>
         <Switch>
         {/* The exact param disables the partial matching for a route and makes sure that it only returns the route if the path is an EXACT match to the current url */}
             <Route exact path='/' component = {App} />
             <Route exact path='/create' component = {Create} />
             <Route exact path='/item/:slug' component = {SingleItem} />
             <Route exact path='/item/update/:slug' component = {UpdateItem} />
             <Route exact path='/contact' component = {ContactUs} />
         </Switch>
        </BrowserRouter>

    );
};


export default Routes;