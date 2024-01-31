import { useContext, useState } from "react";
import Context from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPost() {
    const [caption,setCaption]=useState('')
    const [files,setFiles]=useState(undefined)
    const {Url,clientId}=useContext(Context)
    const navigate=useNavigate()

    const handleSubmit=async()=>{
        const formData=new FormData();
        Array.from(files).map(e=>{
            return formData.append("images",e)
        })
        formData.append("caption",caption)

        try {
            await axios.post(`${Url}/posts`,formData,{
                headers:{
                  "accept-token":localStorage.getItem('token')
                }
              })
            navigate('/')
        } catch (error) {
            alert('Something was wrong,Please try again.')
        }
        
    }
    return (
        <>
           <div className="form-container"style={{width:"100%"}}>
            <div className="addPost-container">
            <div className="d-f-b">
                <div className="noti-card"style={{backgroundColor:"transparent"}}>
                    <div className="card-user">
                        <img src="../salary.png" alt="" className="image-cover"/>
                    </div>
                    <div className="noti-info">
                        <b>Noti-Card</b>
                        <span className="card-date">Let's get you back online! ago
                        <label htmlFor="fileImages"><i className="bi bi-image"style={{margin:"0 10px",fontSize:"14px",color:"blue"}}></i></label>
                        </span>
                    </div>
                </div>

                <button 
                onClick={handleSubmit}
                className="submit-btn"
                style={{margin:"auto 0"}}
                disabled={caption && files!==undefined && clientId!==null?false:true}>
                <i className="bi bi-box-arrow-up" style={{color:caption && clientId!==null && files!==undefined?"black":"red"}}></i>
                </button>

            </div>

          
                <textarea
                onChange={(e)=>{setCaption(e.target.value)}}
                value={caption} type="text" 
                placeholder="What's on your mind?"></textarea>

                {files!==undefined
                &&<div className="addPost-img-container">
                    {files.length>0
                        &&<>{Array.from(files).map(e=>{
                            return <div className="addPost-img"><img src={URL.createObjectURL(e)} alt="" className="image-contain" /></div>
                        })}</>
                    }</div>
                }
                
                <input type="file"
                onChange={(e)=>{setFiles(e.target.files)}}
                multiple
                id="fileImages" 
                style={{display:"none"}}/>

            </div>
           </div>
        </>
    );
}
export default AddPost;
