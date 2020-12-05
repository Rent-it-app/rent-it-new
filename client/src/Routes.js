import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App'

import Create from './components/Create';
import Registration from './components/Registration'
import Signin from './components/Signin'
import ContactUs from './components/ContactUs'
//used to put userdata globaly on the app
import UpdateItem from './components/UpdateItem'
import SingleItem from './components/SingleItem'
import Nav from './components/Nav'
/************************************************* */


export default function Routes() {
  
     return(
        <BrowserRouter>
        <Nav />
        {/*need to have the header here */}
         <Switch>
             <Route exact path='/' component = {App} />
             <Route exact path='/create' component = {Create} />
             <Route exact path='/Register' component = {Registration} />
             <Route exact path='/signin' component = {Signin} />
             <Route exact path='/item/:slug' component = {SingleItem} />
             <Route exact path='/item/update/:slug' component = {UpdateItem} />
             <Route exact path='/contact' component = {ContactUs} />
             
         </Switch>
        </BrowserRouter>

    )
}    