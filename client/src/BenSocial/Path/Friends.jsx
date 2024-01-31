import { useEffect, useReducer,useContext } from "react";
import { INITIAL_STATE, postReducer,ACTION_TYPE } from "../axiosFunctions";
import Context from "../Context";
import ErrorPage from "../Components/Error";
import axios from "axios";
import FriendsCard from "../Components/FriendsCard";
import { useNavigate } from "react-router-dom";

function Friends() {
  const [state,dispatch]=useReducer(postReducer,INITIAL_STATE)
  const {Url}=useContext(Context)
  const navigate=useNavigate()
  useEffect(()=>{
      const FETCH_DATA=async()=>{
        dispatch({type:ACTION_TYPE.FETCH_START})
        try {
            const res=await axios.get(`${Url}/friends`,{
              headers:{
                "accept-token":localStorage.getItem('token')
              }
            })
            dispatch({type:ACTION_TYPE.FETCH_SUCCESS,payload:res.data})

        } catch (error) {
            dispatch({type:ACTION_TYPE.FETCH_ERROR})
        }
      }
      FETCH_DATA()
  },[])

  const search_handler = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value !== "") {
        navigate(`/Search/${value}`);
        e.target.value = "";
    }
  };
  return<div className="Friend-container">
    {state.loading&&<div className="loading-icon"></div>}
    {state.error&& <ErrorPage imgIcon={"https://taeny.dev/404.png"} errorText={"No one is Comments here"}/>}

    {state.post!==null
    &&<>
     <div className="friends-menu">
      <h2 style={{margin:"auto 0"}}>Friends</h2>
      <input type="search" className="friends-search" placeholder="Find Friends" onKeyDown={search_handler}/>
    </div>
      
      
        {state.post.requests.length>0
            &&<>
            <h3>Request</h3>
            <hr />
            <div className="FriendsCard-container">
                {state.post.requests.map(e=>{
                    return <FriendsCard e={e} postData={state.post} dispatch={dispatch}/>
                })}
            </div>
            </>
            }
     

      
        {state.post.friends.length>0
          &&<>
          <h3>People you may known</h3>
          <hr />
          <div className="FriendsCard-container">
              {state.post.friends.map(e=>{
                  return <FriendsCard e={e} postData={state.post} dispatch={dispatch}/>
              })}
          </div>
          </>
          }
         
      
    </>}
    
  </div>
}
export default Friends;
