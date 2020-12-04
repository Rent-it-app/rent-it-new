import React ,{ useEffect, useState } from 'react';
import axios from 'axios'


const SingleItem = props=>{
    const [ item,setItem] = useState('')

    
    useEffect(()=>{
       
        axios
        .get(`${process.env.REACT_APP_API}/item/${props.match.params.slug}`)
        .then(response => setItem(response.data))
        .catch(error => alert('Error loading item'));
        // eslint-disable-next-line 
    },[]);


    return(
        <div className="container pb-5">
         
          <br/>
          <h1>{item.itemName}</h1>
           <p className="lead"> {item.itemDescription} </p>
          
           <p>
             
            
             Item Price (JOD):<span className="badge"> {item.itemPrice}</span>
             Owner <span className="badge"> {item.user} </span>
             <br></br>
             Published on{''}
             <span className="badge">{new Date(item.createdAt).toLocaleString()} </span>
             
           </p>
        </div>
    );

};

export default SingleItem;