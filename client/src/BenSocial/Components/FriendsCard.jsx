import { useContext, useEffect, useState } from "react"
import Context from "../Context"
import { ACTION_TYPE,Noti_TYPE } from "../axiosFunctions";
import axios from "axios";
import { Link } from "react-router-dom";

function FriendsCard({e,postData,dispatch}) {
  const {Url,clientId}=useContext(Context)
  const [isFollow,setIsFollow]=useState(false)

  const handlerFollow=async()=>{
    const res=await axios.post(`${Url}/follow`,{friendId:e.id},{
      headers:{
        "accept-token":localStorage.getItem('token')
      }
    })
    setIsFollow(true)
  }

  const handlerUnFollow=async()=>{
    const res=await axios.post(`${Url}/follow/deleteRequest`,{userID:clientId,friendId:e.id},{
      headers:{
        "accept-token":localStorage.getItem('token')
      }
    })
    setIsFollow(false)
  }

  const handlerConfirm=async()=>{
    const res=await axios.post(`${Url}/friends`,{friendId:e.id,type:Noti_TYPE.CONFIRM},{
      headers:{
        "accept-token":localStorage.getItem('token')
      }
    })
    const filter_Req=postData.requests.filter(t=>t.Name!==e.Name)
    dispatch({type:ACTION_TYPE.FETCH_SUCCESS,payload:{...postData,requests:filter_Req}})
  }

  const handlerRemove=async()=>{
    if(postData.requests.map(t=>t.id).includes(e.id)){

      await axios.post(`${Url}/follow/deleteRequest`,{userID:e.id,friendId:clientId},{
        headers:{
          "accept-token":localStorage.getItem('token')
        }
      })
      const filter_Req=postData.requests.filter(t=>t.id!==e.id)
      dispatch({type:ACTION_TYPE.FETCH_SUCCESS,payload:{...postData,requests:filter_Req}})
      
    }else{
      const filter_F=postData.friends.filter(t=>t.id!==e.id)
      dispatch({type:ACTION_TYPE.FETCH_SUCCESS,payload:{...postData,friends:filter_F}})
    }
  }
  
   return<div className="friends-card "key={e.id}>
      <div className="friends-x"onClick={handlerRemove}><i className="bi bi-x"></i></div>
      <Link to={`/userProfile/${e.id}`} className="friends-img"><img src={`${Url}/${e.profileImage}`} alt="" className="image-cover"/></Link>
      <b>{e.Name}</b>
      <span>{e.Email}</span>


      {/* request button */}
      {postData.requests.map(t=>t.Name).includes(e.Name)
      ? <button type="submit"onClick={handlerConfirm} style={{backgroundColor:"hotpink"}} className="follow-btn">Confirm Friend</button>
      :<>
        <button className="follow-btn"
        type="submit"
        style={{backgroundColor:isFollow?"white":"aqua"}}
        onClick={isFollow?handlerUnFollow:handlerFollow}
        >{isFollow?'Cannel':'Follow'}</button>
      </>}

 </div>
}
export default FriendsCard