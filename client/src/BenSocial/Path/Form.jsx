
import { useState } from "react";
import LoginForm from "../Components/Loginform";
import SignForm from "../Components/Signform";
import { Navigate } from "react-router-dom";

function Form({token}) {
  const [isRegister,setIsRegister]=useState(false)
  if(token){
    return <Navigate to={'/'}></Navigate>
  }else{
    return (
      <>
        <div className="form-container">
          <div action="" className="loginForm">
              <div className="first-child">
                <div style={{width:"50%",height:"50%",margin:"auto"}}>
                <img src="https://i.pinimg.com/originals/5e/09/c3/5e09c3b8fafb30082bbd2b9014de7ab5.jpg" alt="" className="image-cover" />
                </div>
              </div>
              {isRegister
              ?<SignForm setIsRegister={setIsRegister}/>
              :<LoginForm setIsRegister={setIsRegister}/>}
              
          </div>
        </div>
      </>
    );
  }
 
}
export default Form