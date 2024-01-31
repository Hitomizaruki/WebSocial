import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Context from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm({setIsRegister}) {
  const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {Url,setToken}=useContext(Context)
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
      e.preventDefault()
        const formData={
          email:email,
          password:password
        }
        try {
          const res=await axios.post(`${Url}/auth/login`,formData)
          const data=res.data
          if(data.token){
            localStorage.setItem("token",data.token)
            setToken(data.token)
            navigate('/')
          }else{
            alert('Something was wrong,Please try again.')
          }
          

        } catch (error) {
          alert("account is not found")
          
        } 
    }
  return (
    <>
          <form className="sec-child">
            <h3 style={{textAlign:"center"}}>Central Login</h3>

            <label htmlFor="" className="form-label">Email</label>
            <input 
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}  
            type="text"
            className="form-control"
            placeholder="Enter Email" />
            
            <label htmlFor="" className="form-label">Password</label>
            <input
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
            type="text" 
            className="form-control"
            placeholder="Enter Password" />

            <button 
            onClick={handleSubmit}
            disabled={email && password!==undefined?false:true}
            className="follow-btn">Login</button>
            <span style={{textAlign:"center"}}>(or)</span>
            <span onClick={()=>{setIsRegister(true)}}style={{textAlign:"center",color:"lightblue"}}>create a account</span>

          </form>      
    </>
  );
}
export default LoginForm