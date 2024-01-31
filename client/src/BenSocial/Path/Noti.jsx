import NotificationCard from "../Components/NotificationCard"
import { useEffect, useReducer,useContext } from "react";
import { INITIAL_STATE, postReducer,ACTION_TYPE } from "../axiosFunctions";
import Context from "../Context";
import ErrorPage from "../Components/Error";
import axios from "axios";
function Noti() {
  const [state,dispatch]=useReducer(postReducer,INITIAL_STATE)
  const {Url,setCount}=useContext(Context)

  useEffect(()=>{
    setCount(0)
      const FETCH_DATA=async()=>{
        dispatch({type:ACTION_TYPE.FETCH_START})
        try {
                const res=await axios.get(`${Url}/noti`,{
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
  
    return <div className="noti-container">

        {state.loading&&<div className="loading-icon"></div>}
        {state.error&& <ErrorPage imgIcon={"https://taeny.dev/404.png"} errorText={"Something was wrong.Please try again!"}/>}

        {state.post!==null
        &&<>
        <h3 style={{marginTop:"10px"}}>Notificaiton</h3>
            <hr />
            <div className="noti-viewer">
                
                {state.post.result.map(e=>{
                    return <NotificationCard e={e}/>
                })} 
            </div>
        </>
        }
       
    </div>
}
export default Noti