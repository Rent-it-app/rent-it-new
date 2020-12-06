//useState is a Hook that allows you to have state variables in functional components.=> very intersting and easy to use <3 love it
import React , {useState}from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

/****************************************************/

//use the arrow function to bind values 
const Create = ()=>{
    const history = useHistory();
    
//useState() better than useing the set method , it's easer, read about the react hooks(useState) https://youtu.be/InKlyPPSpXA
const [ email        , setEmail ]        = useState();
const [ name         , setName ]         = useState();
const [ password     , setPassword ]     = useState();
const [ passwordAgain, setPasswordAgain] = useState();

//we need to send the data from frontend to backend , I will use axios for that ..
const submit =async (e)=>{
    
    e.preventDefault();
 try {
      const newUser = { email ,name ,password ,passwordAgain } ;
   await axios.post("http://localhost:8000/api/register" , newUser);
   history.push('/signin')
 } catch (error) {
     alert(error.response.data.msg)
 }  

  }
 
   return ( 
  <div className="container p-5">
    <h2> Welcome { name }</h2>
    <h2> Please enter your information to sign up </h2>
    <form>
        <div className="form-group">
            <label className="text-muted"> Name: </label>
            <input id="reg-name" type="text" className="form-control" placeholder="Enter Your name" required onChange={(e)=>{setName(e.target.value)}} />
        </div>
  
        <div className="form-group">
            <label className="text-muted"> Email </label>
            <input id="reg-email" type="email" className="form-control" placeholder="Enter Your email" required onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className="form-group">
            <label className="text-muted"> Password </label>
            <input id="reg-pass" type="text" className="form-control" placeholder="Enter Your Password" required onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <div className="form-group">
            <label className="text-muted"> Confarm  </label>
            <input id="reg-repeat-pass" type="text" className="form-control" placeholder="Enter Your password again" required onChange={(e)=>{setPasswordAgain(e.target.value)}}/>
        </div>
        <div>
            <button onClick={submit} className="btn btn-primary"> Submit </button>
            
        </div>
    </form>
  </div>
)};

export default Create;