import { useState } from "react"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

export default function LoginComponent() {

    const authContext = useAuth()
    const navigate = useNavigate()

    const errorToast = (message) => toast.error(message)
    const successToast = (message) => toast.success(message)
    

    const [username, setUsername] = useState('login')
    const [password, setPassword] = useState('password')

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }
    async function handleSubmit() {
        const response = await authContext.login(username, password)

        if(response != 'login failed'){
            successToast('User ' + username + ' logged in succesfully.')
            if(response == 'athlete'){
                navigate('/athlete') 
            } else {
                navigate('/coach')
            }
        } else {
            errorToast('Login failed.')
        }
    }
    return(
        <div className="LoginComponent">
           <h3>Login</h3> 
           
           <div className="row">
            <div className="col"></div>
            <div className="col">
            <div className="loginForm">
                    <div className="mb-3">
                        <label className = "form-label">Username:</label>
                        <input type = "text" name = "username" className = "form-control" value = {username} 
                            onChange = {handleUsernameChange} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type = "password" name = "password" className="form-control" value = {password} 
                            onChange = {handlePasswordChange} required/>
                    </div>
                    <button className = "btn btn-primary" onClick = {handleSubmit}>Login</button>
            </div>
            </div>
            <div className="col"></div>
           </div>
        </div>
    )
}