import { useContext } from "react";
import Context from "../Context";
import { Noti_TYPE } from "../axiosFunctions";
import { useNavigate } from "react-router-dom";

function NotificationCard({e}) {
    const {Url}=useContext(Context)
    const navigate=useNavigate()
    const handleNavigate=(type)=>{
        switch (type) {
            case Noti_TYPE.CONFIRM:
                
              return navigate(`/userProfile/${e.link}`);
            case Noti_TYPE.COMMENT:
            
            return navigate(`/Posts/${e.link}`);
            case Noti_TYPE.LIKE:
            
            return navigate(`/Posts/${e.link}`);

            default:
                break;
        }
    }
    return (
        <>
           <div className="noti-card"onClick={()=>{handleNavigate(e.type)}}>
                <div className="card-user">
                    <img src={`${Url}/${e.profileImage}`} alt="" className="image-cover"/>
                </div>
                <div className="noti-info">
                    <b>{e.Name}</b>
                    <span className="card-date">
                        {e.type===Noti_TYPE.CONFIRM&&`${e.Name} is accepted your request`}
                        {e.type===Noti_TYPE.COMMENT&&`${e.Name} is comment on your post`}
                        {e.type===Noti_TYPE.LIKE&&`${e.Name} is like on your post`}
                    </span>
                </div>
            </div>
        </>
    );
}
export default NotificationCard;
