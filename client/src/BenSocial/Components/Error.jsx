
function ErrorPage({imgIcon,errorText}) {
    return <div className="error-page">
        <div className="error-img"><img src={imgIcon} alt="" className="image-cover" /></div>
        <span>{errorText}</span>
    </div>
}
export default ErrorPage