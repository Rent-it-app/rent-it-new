import React from 'react';
import {Link} from 'react-router-dom'
import Cap from "../imges/Capture.PNG"
const Nav =()=>
(      
    <nav>
        <ul className="nav nav-tabs">

        <li className="nav-item pr-3 pt-4 pb-3">
                    <img src= {Cap} alt="cap"/>
            </li>

            <li className="nav-item pr-3 pt-5 pb-3">
                <Link to="/"> Home </Link>
            </li> 
    
            <li className="nav-item pr-3 pt-5 pb-3">
                    <Link to="/create"> Add Rentals </Link>
            </li>
            
            <li className="nav-item pr-3 pt-5 pb-3">
                    <Link to="/contact"> Contact Us </Link>
            </li>
            <li className="nav-item pr-3 pt-5 pb-3">
                    <Link to='/Register'> Sign up </Link>
            </li>
            <li className="nav-item pr-3 pt-5 pb-3">
                    <Link to='/signin'> Sign in</Link>
            </li>
            <li className="nav-item pr-3 pt-5 pb-3" onClick ={() =>{ localStorage.clear();  alert('You are signed out')} }>
                    <Link to='/' > Sign out</Link>
            </li>
            
        </ul>
    </nav>
);

export default Nav;