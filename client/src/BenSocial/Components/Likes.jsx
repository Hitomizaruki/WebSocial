import { useContext, useState } from "react"
import Context from "../Context"
import ErrorPage from "./Error"
import { ACTION_TYPE } from "../axiosFunctions"
import axios from "axios"


function Likes({statePost,dispatch}) {
    const { Url,user} = useContext(Context)
    const [isLike,setIsLike]=useState(statePost.likes.map(e=>e.id).includes(user.id)?true:false)

    const handleLike=async()=>{
       
        try {
            const res=await axios.post(`${Url}/likesAndComm/postLike`,{
                userId:user.id,
                postId:statePost.posts[0].id,
            })
            dispatch({
                type:ACTION_TYPE.FETCH_SUCCESS,
                payload:{
                    ...statePost,
                    likes:[...statePost.likes,{id:user.id,Name:user.Name,profileImage:user.profileImage}],
                    posts:[{
                        ...statePost.posts[0],
                        likeCount:statePost.posts[0].likeCount+=1
                    }]
                }
            })
            setIsLike(true)
        } catch (error) {
            alert('Something was wrong,Please try again.')
        }
        
    }
    const handleRemoveLike=async()=>{
       
        try {
            const res=await axios.post(`${Url}/likesAndComm/deleteLike`,{
                userId:user.id,
                postId:statePost.posts[0].id,
            })
            dispatch({
                type:ACTION_TYPE.FETCH_SUCCESS,
                payload:{
                    ...statePost,
                    likes:statePost.likes.filter(e=>e.id!==user.id),
                    posts:[{
                        ...statePost.posts[0],
                        likeCount:statePost.posts[0].likeCount-=1
                    }]
                }
            })
            setIsLike(false)
        } catch (error) {
            alert('Something was wrong,Please try again.')
        }
        
    }
    return <>
    <div style={{textAlign:"right"}}>
        <i 
        className="bi bi-heart"
        onClick={handleLike}
        style={{display:isLike?"none":"inline"}}></i>

        <i 
        className="bi bi-heart-fill"
        onClick={handleRemoveLike}
        style={{display:isLike?"inline":"none"}}></i>
    </div>
        {statePost.likes.length>0
        ?<>
        {statePost.likes.map(e=>{
            return <div className="likes-items">
                <div className="d-f-b">
                    <div class="card-user">
                        <img src={`${Url}/${e.profileImage}`} alt="" class="image-cover"/>
                    </div>
                    <b className="likes-text">{e.Name}</b>
                </div> 
            </div>
        })}
        </>
        :<>
        <ErrorPage imgIcon={"https://www.freeiconspng.com/uploads/facebook-like-icons-8.png"} errorText={"No one is Likes here"}/>
        </>}
       
    </>
}
export default Likes