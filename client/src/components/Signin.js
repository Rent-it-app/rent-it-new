//useState is a Hook that allows you to have state variables in functional components.=> very intersting and easy to use <3 love it
import React , {useState}from 'react';
import axios from 'axios';

/****************************************************************/

const Signin = ()=>{

//the values wich iserted by the user is stored at email and password using setEmail,setPasswword 
const [ email        , setEmail    ]     = useState();
const [ password     , setPassword ]     = useState();

//we need to send the data from frontend to backend , I will use axios for that ..
const submit =async (e)=>{
  e.preventDefault();
  try {
    const newUser = { email ,password } ;
    await axios.post("http://localhost:8000/api/signin" , newUser).then(response => {}).catch(error =>{})
  } catch (error) {
    alert(error.response.data.msg)
  }
 
}

  return(
  <div className="container p-5">
    <h2> Wellcome </h2>
    <h2> Please enter your information to sign in </h2>
    <form>    
        <div className="form-group">
            <label className="text-muted"> Email </label>
            <input type="text" className="form-control" placeholder="Enter Your email"onChange={(e)=>{setEmail(e.target.value)}} required/>
        </div>
        <div className="form-group">
            <label className="text-muted"> Password </label>
            <input type="password" className="form-control" placeholder="Enter Your Password" onChange={(e)=>{setPassword(e.target.value)}} required/>
        </div>
        <div>
            <button  onClick={submit} className="btn btn-primary" > Submit </button>
            
        </div>
    </form>
  </div>
)};

export default Signin;