import { Navigate } from "react-router-dom"
function Protect({token,children}) {
    if(token!==null){
        return children
    }
    else{
        return <Navigate to={"/Login"}/>
    }
}
export default Protect