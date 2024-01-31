import ProfileCard from "../Components/ProfileCard"
import { useContext} from "react";
import Context from "../Context";


function Myinfo() {
    const {clientId}=useContext(Context)
   return <ProfileCard userID={clientId}/>
}
export default Myinfo