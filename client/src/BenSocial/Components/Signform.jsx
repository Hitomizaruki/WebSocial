import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Context from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignForm({setIsRegister}) {
  const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const [isOtp,setIsOtp]=useState(false)
    const [otp,setOtp]=useState(null)
    const [otpMess,setOtpMess]=useState(null)
    const {Url,setToken}=useContext(Context)
    const navigate=useNavigate()

    const handleOtp=async(e)=>{
      e.preventDefault()
      const res=await axios.post(`${Url}/auth/GetOtp`,{Email:email})
      const data=res.data
      setOtp(data)
      setIsOtp(true)
    }
    const handleSubmit=async(e)=>{
      e.preventDefault()
       if(otp!==otpMess){
        alert("otp code is Invalid")
       }else{
          const formData={
            email:email,
            password:password,
            name:name
          }
          try {
            const res=await axios.post(`${Url}/auth/register`,formData)
            const data=res.data
            if(data.token){
              localStorage.setItem("token",data.token)
              setToken(data.token)
              navigate('/')
            }else{
              alert("Something was wrong.Please try again")
            }
            

          } catch (error) {
            alert("register is failed")
            
          } 
       }
    }
  return (
    <>
         {isOtp

         ?<form className="sec-child">
          <input 
          onChange={(e)=>{setOtpMess(e.target.value)}}
          value={otpMess}  
          type="text"
          className="form-control"
          placeholder="Enter Your Name" />

          <button 
          onClick={handleSubmit}
          disabled={otp?false:true}
          className="follow-btn">Submit</button>

         </form>

         :<form className="sec-child">
         <h3 style={{textAlign:"center"}}>Central Sign</h3>

         <label htmlFor="" className="form-label">Name</label>
         <input 
         onChange={(e)=>{setName(e.target.value)}}
         value={name}  
         type="text"
         className="form-control"
         placeholder="Enter Your Name" />
         
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
         onClick={handleOtp}
         disabled={email && name!=="" && password!==undefined?false:true}
         className="follow-btn">Next</button>
         <span style={{textAlign:"center"}}>(or)</span>
         <span onClick={()=>{setIsRegister(false)}}style={{textAlign:"center",color:"lightblue"}}>go back to login</span>

       </form>  }     
    </>
  );
}
export default SignForm