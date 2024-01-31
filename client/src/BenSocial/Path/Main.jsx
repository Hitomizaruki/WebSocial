import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"

function Router() {
    
    return<>
    <div class="main-container">
        <Navbar />
        <div class="sec-container">
            <Outlet/>
        </div>
    </div>
    </>
}
export default Router;
