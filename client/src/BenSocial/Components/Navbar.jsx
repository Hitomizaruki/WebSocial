import { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Context from "../Context"

function Navbar() {
  const {notiCount,count,setCount,user}=useContext(Context)
  const notiStore=JSON.parse(localStorage.getItem("noti"))

  useEffect(()=>{
    

    if(notiCount!==null){
        if(notiStore!==null){
            let newNoti=notiCount-notiStore
            localStorage.setItem("noti",JSON.stringify(notiCount))
            setCount(newNoti)
        }
        else{
            localStorage.setItem("noti",JSON.stringify(notiCount))
        }


    }else{
       return
    }
  },[notiCount])
    return <>
         <div className="first-container">
        <div className="brand-container">
            <div className="brand-icon"><img src="../logo512.png" alt="" className="image-cover"/></div>
            <h3 className="brand">CENTRAL</h3>
        </div>
        
        <div className="nav-container">
            <NavLink to={'/'} className={({isActive})=>{
                return isActive?"active":"nav-items"
            }}>
                <div  className="nav-link">
                    <i className="bi bi-house nav-icon"></i>
                    <span className="nav-text">Latest New</span>
                </div>
            </NavLink>
            <NavLink to={'/Friends'} className={({isActive})=>{
                return isActive?"active":"nav-items"
            }}>
                <div  className="nav-link">
                    <i className="bi bi-people nav-icon"></i>
                    <span className="nav-text">Friends & Request</span>
                </div>
            </NavLink>
            <NavLink to={'/Noti'} className={({isActive})=>{
                return isActive?"active":"nav-items"
            }}>
                <div  className="nav-link">
                    <i className="bi bi-chat nav-icon"></i>
                    <span className="nav-text">Notificiation</span>
                    {count!==0&&<span style={{margin:"0 10px",color:"hotpink"}}>{count}</span>}
                    
                </div>
            </NavLink>
            <NavLink to={`/Account`} className={({isActive})=>{
                return isActive?"active":"nav-items"
            }}>
                <div  className="nav-link">
                    <i className="bi bi-person nav-icon"></i>
                    <span className="nav-text">Account</span>
                </div>
            </NavLink>
          
        </div>
    </div>
    </>
}
export default Navbar