import { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { INITIAL_STATE, postReducer,ACTION_TYPE } from "../axiosFunctions";
import Context from "../Context";
import ErrorPage from "../Components/Error";
import Comments from "../Components/Comments";
import Likes from "../Components/Likes";
import { Link, useParams } from "react-router-dom";

function Post() {
  const [state,dispatch]=useReducer(postReducer,INITIAL_STATE)
  const {Url}=useContext(Context)
  const [navChange,setNavChange]=useState(true)
  const [control,setControl]=useState(true)
  const [isInfo,setIsInfo]=useState(false)
  const {PostID}=useParams()

  useEffect(()=>{
      const FETCH_DATA=async()=>{
        dispatch({type:ACTION_TYPE.FETCH_START})
        try {

            const res=await axios.get(`${Url}/posts/${PostID}`,{
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
    {state.error&& <ErrorPage imgIcon={"../logo512.png"} errorText={"No one is Comments here"}/>}
    {state.post!==null
    ?<>
      <div className="posts-container"style={{background:"#f4f4f4",position:"relative"}}>

            {
                state.post.posts.map(t=>{
                    return<>
                    <div className="postalert-context"style={{display:control?"flex":"none"}}>
                        <h5 className="card-user-name">{t.Name}</h5>
                        <span className="card-date">{t.createDate}</span>
                        <span className="card-captions">{t.captions}</span>
                    </div>
                    <div className="postalert-icons"style={{display:control?"flex":"none"}}>
                        <div onClick={()=>{setIsInfo(!isInfo)}} className="post-icons backHome">
                            <i className="bi bi-box "></i>
                            <span className="i-text">See Comm and Likes</span>
                        </div>
                        <div className="d-f-b">
                            <div className="post-icons">
                                <i className="bi bi-heart "></i>
                                <span className="i-text">{t.likeCount} like</span>
                            </div>
                            <div className="post-icons">
                                <i className="bi bi-chat "></i>
                                <span className="i-text">{t.commentCount} comments</span>
                            </div>
                        </div>
                    </div>
                    </>
                })
               
            }
        <div className="post-viewer"onClick={()=>{setControl(!control)}}>
            {JSON.parse(state.post.posts[0].photo).map(e=>{
                return<div className="card-img"style={{height:"100vh"}}>
                <img src={`${Url}/${e}`} alt="" className="image-contain" />
                </div>
            })}
        </div>

      </div>

      <div className="comments-container"style={{display:isInfo?"flex":"none"}}>
        <div className="post-context-info">
            
            <div onClick={()=>{setNavChange(true)}} className="post-nav-icon"style={{padding:"20px",background:navChange?"aqua":""}}>
                <i className="bi bi-chat "></i>
                <span className="i-text">Comments</span>
            </div>

            <div onClick={()=>{setNavChange(false)}} className="post-nav-icon "style={{padding:"20px",background:navChange?"":"aqua"}}>
                <i className="bi bi-heart "></i>
                <span className="i-text">Likes</span>
            </div>

        </div>
        <div className="context-secChild">
            {navChange

            ?<Comments 
            statePost={state.post}
            dispatch={dispatch}/>

            :<Likes 
            statePost={state.post}
            dispatch={dispatch}/>}
        </div>
      </div>
    </>
    :<></>}
    

      
  </>
}
export default Post