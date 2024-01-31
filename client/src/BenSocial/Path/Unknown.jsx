import { Link } from "react-router-dom"

function Unknown() {
    return<>
        <div className="UnknownPage-container">
            <div className="container">
                <div className="col"style={{flex:"0.3 0 0"}}>
                <img src="https://info.heapanalytics.com/rs/622-XIP-837/images/Broken%20Website%20Ilustration.png" alt="" className="image-cover" />
                </div>
                <div className="col">
                    <h2>404 Not Found</h2>
                    <p>We couldn't find the page you were looking for.it may have been moved.or it just doesn't exist.</p>
                    <Link to={'/'} className="nav-home-btn">Go Back Home</Link>
                
                </div>
            </div>
        </div>
    </>
}
export default Unknown