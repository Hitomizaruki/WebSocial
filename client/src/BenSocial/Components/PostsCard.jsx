import { useContext } from "react";
import Context from "../Context";
import { Link } from "react-router-dom";

function PostsCard({e}) {
  const {Url}=useContext(Context)
  return (
    <div className="post-card shadow">
        <div className="d-f-b">
          <div className="noti-card">
            <Link to={`/userProfile/${e.createUser}`} className="card-user">
                <img src={`${Url}/${e.profileImage}`} alt="" className="image-cover"/>
            </Link>
            <div className="noti-info">
                <b>{e.Name}</b>
                <span className="card-date">{e.createDate}</span>
            </div>
          </div>

          <div className="d-f-b">
            <div className="post-icons"style={{margin:"auto 5px"}}>
              <i className="bi bi-heart"></i>
              <span>{e.likeCount}</span>
            </div>
            <div className="post-icons"style={{margin:"auto 5px"}}>
              <i className="bi bi-chat"></i>
              <span>{e.commentCount}</span>
            </div>
            <div className="post-icons"style={{margin:"auto 5px"}}>
            <i className="bi bi-box-arrow-right"></i>
            <span>share</span>
            </div>
            
            

          </div>
        </div>
        <div className=""style={{margin:"10px"}}>{e.captions}</div>

      <Link to={`/Posts/${e.id}`} className="card-viewer">
        <div className="card-img">
          <img src={`${Url}/${JSON.parse(e.photo)[0]}`} alt="" className="image-cover" />
        </div>
      </Link>

            
     
    </div>
  );
}
export default PostsCard;
