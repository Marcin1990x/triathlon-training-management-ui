import { useNavigate } from "react-router-dom"
import { useAuth } from "../security/AuthContext"
import { Toaster, toast } from "react-hot-toast"

const HeaderComponent = () => {

    const navigate = useNavigate()
    const authContext = useAuth()
    const successToast = (message) => toast.success(message)

    const handleLogoutBtn = () => {
        authContext.logout()
        navigate(`/`)
        successToast('Logged out succesfully.')
    }

    return (
        <div className="headerComponent">
            <header className="border-bottom border-light border-5 mb-5 p-2">
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg">
                            <div className="collapse navbar-collapse">
                                <button className="btn btn-dark btn-sm m-1">Button</button>
                                <button className="btn btn-dark btn-sm m-1">Button</button>
                            </div>
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    <div>
                                        <button className="btn btn-dark btn-sm m-1">Button</button>
                                        {authContext.isAuthenticated && 
                                        <button className="btn btn-danger btn-sm m-1" onClick={() => handleLogoutBtn()}>Logout</button> }
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <Toaster toastOptions={{duration: 4000}}/>
            </header>
        </div>
    )
}
export default HeaderComponent