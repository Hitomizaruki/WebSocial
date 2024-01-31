
import { Link } from "react-router-dom"
import PostsCard from "../Components/PostsCard"
import FriendsCard from "../Components/FriendsCard"
import axios from "axios";
import { INITIAL_STATE, postReducer,ACTION_TYPE, Noti_TYPE } from "../axiosFunctions";
import Context from "../Context";
import ErrorPage from "../Components/Error";
import { useContext, useEffect, useReducer, useState } from "react";

function ProfileCard({userID}) {
    const [changeName,setChangeName]=useState('')
    const [file,setFile]=useState(undefined)
    const [isChange,setIsChange]=useState(false)

    const [state,dispatch]=useReducer(postReducer,INITIAL_STATE)
    const {Url,clientId}=useContext(Context)

    useEffect(()=>{
        const FETCH_DATA=async()=>{
            dispatch({type:ACTION_TYPE.FETCH_START})
            try {
                if(userID!==null){
                    const res=await axios.get(`${Url}/profile/${userID}`,{
                        headers:{
                          "accept-token":localStorage.getItem('token')
                        }
                      })
                    dispatch({type:ACTION_TYPE.FETCH_SUCCESS,payload:res.data})
                }
                
            } catch (error) {
                dispatch({type:ACTION_TYPE.FETCH_ERROR})
            }
        }
        FETCH_DATA()
    },[userID,clientId])
    const handleFriendsRemove=async(e,n)=>{
        await axios.delete(`${Url}/friends/${n.id}`,{
            headers:{
              "accept-token":localStorage.getItem('token')
            }
          })
        dispatch({type:ACTION_TYPE.FETCH_SUCCESS,payload:{
            ...state.post,
            isFriends:e.filter(t=>t!=n.Name),
        }})
    }
    const handlerUnFollow=async(e,n)=>{
        console.log(clientId)

        const res=await axios.post(`${Url}/follow/deleteRequest`,{userID:clientId,friendId:n.id},{
            headers:{
              "accept-token":localStorage.getItem('token')
            }
        })
        dispatch({type:ACTION_TYPE.FETCH_SUCCESS,payload:{
            ...state.post,
            myRequests:e.filter(t=>t!=n.Name),
        }})
    }
    const handlerFollow=async(n)=>{
        const res=await axios.post(`${Url}/follow`,{friendId:n.id},{
            headers:{
              "accept-token":localStorage.getItem('token')
            }
        })
        dispatch({type:ACTION_TYPE.FETCH_SUCCESS,payload:{
            ...state.post,
            myRequests:[...state.post.myRequests,n.Name]
        }})
    }
    const handlerConfirm=async(e,n)=>{
        const res=await axios.post(`${Url}/friends`,{friendId:n.id,type:Noti_TYPE.CONFIRM},{
            headers:{
              "accept-token":localStorage.getItem('token')
            }
          })
        dispatch({type:ACTION_TYPE.FETCH_SUCCESS,payload:{
            ...state.post,
            requests:e.filter(t=>t!=n.Name),
            isFriends:[...state.post.isFriends,n.Name]
        }})
    }
    const handleProfile=async()=>{
        const formdata=new FormData()
        formdata.append("profileImg",file)
        formdata.append("name",changeName!==''?changeName:state.post.profile.Name)
        await axios.post(`${Url}/profile`,formdata,{
            headers:{
              "accept-token":localStorage.getItem('token')
            }
          })
        dispatch({type:ACTION_TYPE.FETCH_SUCCESS,payload:{
            ...state.post,
            profile:{...state.post.profile,Name:changeName!==''?changeName:state.post.profile.Name}
        }})
        setChangeName('')
        setIsChange(false)
    }
  return<>
    {state.loading&&<div className="loading-icon"></div>}
    {state.error&& <ErrorPage imgIcon={"https://taeny.dev/404.png"} errorText={"Something was wrong.Please try again!"}/>}

    {state.post!==null
    &&<>
        <div className="setting-container">
            <div className="isChange-container"style={{display:isChange?"flex":"none"}}>
                <i
                className="bi bi-x"onClick={()=>{
                    setIsChange(false)
                    setFile(undefined)
                    setChangeName('')
                }}
                ></i>

                <h3 style={{margin:"10px 0"}}>Change Profile</h3>

                <input type="file" 
                className=""
                onChange={(e)=>{setFile(e.target.files[0])}}/>

                <input 
                onChange={(e)=>{setChangeName(e.target.value)}}
                value={changeName}
                type="text"
                className="form-control" 
                placeholder="Enter Your new name"/>


                <button 
                className="follow-btn"
                disabled={changeName!=="" || file!==undefined?false:true}
                onClick={handleProfile}
                style={{margin:"0 auto",background:"lightblue"}}>Change
                </button>
            </div>
            <div className="d-f-b"style={{flexWrap:"wrap"}}>

                <div className="profile-container">
                    <div className="profile-img"><img src={file!==undefined?URL.createObjectURL(file):`${Url}/${state.post.profile.profileImage}`} alt="" className="image-cover" /></div>
                    <div className="profile-info">
                        <h3>{state.post.profile.Name}</h3>
                        <span className="card-date">{state.post.friends.length} Friends</span>

                        {/* Conditions of your account   */}
                        {state.post.MYID===JSON.parse(userID)
                        && <button
                            className="follow-btn"
                            onClick={()=>{
                                setIsChange(true)
                            }}
                            style={{background:"lightblue"}}>Edit Profile
                        </button>}
                        
                        {state.post.requests.includes(state.post.profile.Name)
                        && <button
                            className="follow-btn"
                            onClick={()=>{
                                handlerConfirm(state.post.requests,state.post.profile)
                            }}
                            style={{background:"hotpink"}}>Confirm Friends
                        </button>}

                        {state.post.myRequests.includes(state.post.profile.Name)
                        && <button 
                            className="follow-btn"
                            onClick={()=>{
                                handlerUnFollow(state.post.isFriends,state.post.profile)
                            }}
                            style={{background:"#f4f4f4"}}>Cannel Request
                        </button>}

                        {state.post.isFriends.includes(state.post.profile.Name)
                        &&<button
                            className="follow-btn"
                            onClick={()=>{
                                handleFriendsRemove(state.post.isFriends,state.post.profile)
                            }}
                            style={{background:"#f4f4f4"}}>UnFriend
                        </button>}

                        {JSON.parse(userID) !==state.post.MYID
                        && !state.post.requests.includes(state.post.profile.Name)
                        && !state.post.myRequests.includes(state.post.profile.Name)
                        && !state.post.isFriends.includes(state.post.profile.Name)
                        ?<button
                            onClick={()=>{
                                handlerFollow(state.post.profile)
                            }}
                            className="follow-btn">Follow
                        </button>
                        :<></>}

                        

                        
                    </div>
                </div>
                {state.post.MYID===JSON.parse(userID)
                    && <div className="profile-shotcuts">
                    <Link to={`/addPost`} className="shortcut-icons"style={{color:"black"}}>
                    <div className="brand-icon"><img src="../order.png" alt="" className="image-cover" /></div>
                        <b>Add Posts</b>
                        
                    </Link>
                    <Link to={`/Friends`} className="shortcut-icons"style={{color:"black"}}>
                    <div className="brand-icon"><img src="../order.png" alt="" className="image-cover" /></div>
                        <b>Find Friends</b>
                        
                    </Link>
                </div>}
               
            </div>

            
            
            {state.post.friends.length>0
            &&<>
            <h3>Friends</h3>
            <hr />
            <div className="FriendsCard-container">
                {state.post.friends.map(e=>{
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
            
                <h4>Posts</h4>
                <hr />
                {state.post.posts.map((e,index)=>{
                return <PostsCard e={e}/>
                })} 
            </>
            :<>
            <ErrorPage imgIcon={"https://cdn.dribbble.com/users/683081/screenshots/2728654/exfuse_app_main_nocontent.png"} errorText={"No Contect found"}/>
            </>}

        </div>
    </>
    }

   </>
}
export default ProfileCard