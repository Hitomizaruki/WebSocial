import { useContext, useState } from "react"

import Context from "../Context"
import ErrorPage from "./Error"
import { ACTION_TYPE } from "../axiosFunctions"
import axios from "axios"

function Comments({statePost,dispatch}) {
    const { Url,user,date} = useContext(Context)
    const [captions,setCaptions]=useState('')
    const handleSend=async()=>{
        const captionsBox={
            profileImage:user.profileImage,
            Name:user.Name,
            comments:captions,
            createDate:date,
        }
        try {
            const res=await axios.post(`${Url}/likesAndComm/comments`,{
                userId:user.id,
                postId:statePost.posts[0].id,
                comments:captions,
                createDate:date
            })
            dispatch({
                type:ACTION_TYPE.FETCH_SUCCESS,
                payload:{
                    ...statePost,
                    comments:[...statePost.comments,captionsBox],
                    posts:[{
                        ...statePost.posts[0],
                        commentCount:statePost.posts[0].commentCount+=1
                    }]
                }
            })
            setCaptions('')
        } catch (error) {
            alert('Something was wrong,Please try again.')
        }
        
    }
    return<>
        <div className="d-f-b">
            <input 
            type="text"className="captions-box"
            value={captions}
            onChange={(e)=>{setCaptions(e.target.value)}}placeholder="comments" />
            <button className="captions-btn" style={{display:captions?"block":"none"}} onClick={handleSend}>send</button>
        </div>
        
       {statePost.comments.length>0
       ?<>
        {statePost.comments.map(e=>{
            return  <div class="comments-items ">
            <div class="card-user">
                <img src={`${Url}/${e.profileImage}`} alt="" class="image-cover"/>
            </div>
            <div class="post-info"style={{background:"#f4f4f4",padding:"10px",maxWidth:"150px"}}>
                <h5 class="card-user-name">{e.Name}</h5>
                <span class="card-date">{e.createDate}</span>
                <span class="comments-text">
                    {e.comments}
                </span>
            </div>
        </div>
        })}
        
       </>
        :<>
        <ErrorPage imgIcon={"https://cdn0.iconfinder.com/data/icons/housing-interface-1/16/no_comments-512.png"} errorText={"No one is Comments here"}/>
        </>}
        
    </>
} 
export default Comments