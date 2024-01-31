import Home from "./Path/Home";
import Main from "./Path/Main";
import Friends from "./Path/Friends";

import {BrowserRouter,Routes,Route}from "react-router-dom"
import "./app.css"
import { useEffect, useState } from "react";
import Noti from "./Path/Noti";
import Myinfo from "./Path/Myinfo";
import Context from "./Context";
import Post from "./Path/Post";
import UserProfile from "./Path/UserProfile";
import Form from "./Path/Form";
import AddPost from "./Path/AddPost";
import axios from "axios";
import Protect from "./Path/Protect";
import Search from "./Path/Search";
function App() {
    const [count,setCount]=useState(0)
    const [notiCount,setNotiCount]=useState(null)
    const [clientId,setClientId]=useState(null)
    const [user,setUser]=useState(null)
    const [token,setToken]=useState(localStorage.getItem('token'))
    const Url='http://localhost:4000'
    const jsDate=new Date
    let date=`${jsDate.getMonth()+1}/${jsDate.getDate()}/${jsDate.getFullYear()}`
    useEffect(()=>{
        const FETCH_DATA=async()=>{
            try {
                const res=await axios.get(`${Url}/auth`,{
                    headers:{
                      "accept-token":localStorage.getItem('token')
                    }
                  })
                  setClientId(res.data.user.id)
                  setNotiCount(res.data.noti)
                  setUser(res.data.user)
            } catch (error) {
               
            }
        }
        FETCH_DATA()
    },[token,setToken])

    return<Context.Provider value={{
        date,
        user,
        Url,
        notiCount,
        setNotiCount,
        clientId,
        setToken,
        count,
        setCount}}>
         <BrowserRouter>
            <Routes>
                <Route path="/"element={
                <Protect token={token}>
                    <Main/>
                </Protect>
                }>

                    {/* Posts and Post Information */}
                    <Route index element={<Home />}/>
                    <Route path="/Posts/:PostID" element={<Post/>}/>


                    <Route path="/Friends" element={<Friends/>}/>
                    <Route path="/Noti" element={<Noti/>}/>

                    <Route path="/addPost" element={<AddPost/>}/>
                   
                    <Route path="/Search/:searchID" element={<Search/>}/>

                    {/* userProfile */}
                    <Route path="/Account" element={<Myinfo/>}/>
                    <Route path="/userProfile/:clientID" element={<UserProfile/>}/>

                </Route>
                <Route path="/login" element={<Form token={token}/>}/>

            </Routes>
        </BrowserRouter>
    </Context.Provider>
}
export default App