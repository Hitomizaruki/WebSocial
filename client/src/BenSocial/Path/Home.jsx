import { useContext, useEffect, useReducer } from "react";
import PostsCard from "../Components/PostsCard"
import axios from "axios";
import { INITIAL_STATE, postReducer,ACTION_TYPE } from "../axiosFunctions";
import Context from "../Context";
import ErrorPage from "../Components/Error";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";

function Home() {
  const [state,dispatch]=useReducer(postReducer,INITIAL_STATE)
  const {Url}=useContext(Context)

  useEffect(()=>{
      const FETCH_DATA=async()=>{
        dispatch({type:ACTION_TYPE.FETCH_START})
        try {

            const res=await axios.get(`${Url}/posts`,{
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

  
  return<>
    {state.loading&&<div className="loading-icon"></div>}
    {state.error&& <ErrorPage imgIcon={"https://taeny.dev/404.png"} errorText={"Something was wrong.Please try again!"}/>}

    {state.post!==null
    &&<>
      <div className="posts-container"style={{display:"block"}}>
          <Nav/>

          {state.post.posts.map(e=>{
            return <PostsCard e={e}/>
          })} 
      </div>

      <div className="context-container">
        <h4 style={{marginTop:"10px"}}>Advestinment</h4>
        <hr />
        <div className="ads-images"><img src="../salary.png" alt="" className="image-cover" /></div>
        <h4>Conversation</h4>
        <hr />
      </div>
    </>
    }
    

      
  </>
}
export default Home