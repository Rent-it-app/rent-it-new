import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App'
import Create from './Create';
import Registration from './components/Registration'
import Signin from './components/Signin'

/************************************************* */
const Routes =()=> {
    return(
        <BrowserRouter>
        {/*need to have the header here */}
         <Switch>
             <Route exact path='/' component = {App} />
             <Route exact path='/create' component = {Create} />
             <Route exact path='/Register' component = {Registration} />
             <Route exact path='/signin' component = {Signin} />
         </Switch>
        </BrowserRouter>

    );
};


export default Routes;