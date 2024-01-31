
import { Navigate, useParams } from "react-router-dom"
import ProfileCard from "../Components/ProfileCard"

function UserProfile() {
    const {clientID}=useParams()
    return <ProfileCard userID={clientID}/>
  
}
export default UserProfile