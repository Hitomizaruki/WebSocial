import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";
import  Context  from "../Context";
import { INITIAL_STATE, postReducer,ACTION_TYPE } from "../axiosFunctions";
import ErrorPage from "../Components/Error";
import axios from "axios";
import PostsCard from "../Components/PostsCard";

function Search() {
    const [state,dispatch]=useReducer(postReducer,INITIAL_STATE)
    const {Url}=useContext(Context)
    const {searchID}=useParams()
    useEffect(()=>{
        const FETCH_DATA=async()=>{
          dispatch({type:ACTION_TYPE.FETCH_START})
          try {
              const res=await axios.get(`${Url}/search/${searchID}`,{
                headers:{
                  "accept-token":localStorage.getItem('token')
                }
              })
              dispatch({type:ACTION_TYPE.FETCH_SUCCESS,payload:res.data})
              console.log(res.data)
          } catch (error) {
              dispatch({type:ACTION_TYPE.FETCH_ERROR})
          }
        }
        FETCH_DATA()
    },[])
    return<div className="setting-container">
    <h3 style={{marginTop:"10px"}}>Search For "{searchID}"</h3>
    <hr />

    {state.loading&&<div className="loading-icon"></div>}
    {state.error&& <ErrorPage imgIcon={"https://taeny.dev/404.png"} errorText={"Your searching is not found"}/>}
    {state.post!==null
    &&<>
        {state.post.people.length>0
        &&<>
        
        <div className="FriendsCard-container">
            {state.post.people.map(e=>{
                return <Link to={`/userProfile/${e.id}`} className="Profilefriends-card ">
                    <img src={`${Url}/${e.profileImage}`} alt="" className="image-cover"/>
                <b>{e.Name}</b>
            </Link>
            })}
        </div>
        </>
        }
     

      
        {state.post.posts.length>0
        ?<>
        
        <div className="grid-card-container">
            {state.post.posts.map(e=>{
                return <PostsCard e={e}/>
            })}
        </div>
        </>
        :<>
        <ErrorPage imgIcon={"https://cdn.dribbble.com/users/683081/screenshots/2728654/exfuse_app_main_nocontent.png"} errorText={"No Contect found"}/>
        </>}
         
      
    </>
    }
    
    </div>
}
export default Search;