import { Link } from "react-router-dom"

function Nav() {

    return <>
         <div className="d-f-around">
           
            <Link className="post-items " to={'/addPost'}>
                <div  className="nav-link">
                    <i className="bi bi-plus nav-icon"></i>
                    <span className="postNav-text">Create Post </span>
                </div>
            </Link>
            
            <Link className="post-items " to={'/Friends'}>
                <div  className="nav-link">
                    <i className="bi bi-people nav-icon"></i>
                    <span className="postNav-text">Find Friends </span>
                </div>
            </Link>
          </div>
    </>
}
export default Nav