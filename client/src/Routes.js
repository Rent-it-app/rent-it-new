import React, { useState , useEffect} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App'
import Axios from "axios";
import Create from './Create';
import Registration from './components/Registration'
import Signin from './components/Signin'

//used to put userdata globaly on the app
import UserContext from './UserContext'

/************************************************* */


export default function Routes() {
   /*
    const {userData , setUserData} = useState({
        token : undefined,
        user : undefined
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
          let token = localStorage.getItem("theToken");
          if (token === null) {
            localStorage.setItem("theToken", "");
            token = "";
          }
          const tokenRes = await Axios.post(
            "http://localhost:8000/api/check_token",
            null,
            { headers: { "theToken": token } }
          ); console.log(tokenRes.headers.theToken);
          if (tokenRes.data) {
            const userRes = await Axios.get("http://localhost:8000/api/", {
              headers: { "theToken": token },
            });
           
            setUserData({
              token,
              user: userRes.data,
            });
          }
        };
    
        checkLoggedIn();
      }, []);  <UserContext.Provider value ={{ userData , setUserData }} />
*/
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

    )
}    