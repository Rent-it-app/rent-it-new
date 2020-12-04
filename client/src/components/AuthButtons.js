import React from 'react';

import { useHistory } from "react-router-dom";

export default function AuthButton (){

    const history = useHistory();// is function in the react ook contains the history of the user url movements 
    //change the 
    const register = ()=> history.push('/register')
    const signin = () => history.push('/signin')
    return(
        <div>

            <button onClick={register}>Register</button>
            <button onClick={signin}>sign in</button>
        </div>
    )
} 