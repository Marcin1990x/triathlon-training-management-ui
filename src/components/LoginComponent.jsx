import { useState } from "react"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

export default function LoginComponent() {

    const authContext = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState('login')
    const [password, setPassword] = useState('password')

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }
    async function handleSubmit() {
        if(await authContext.login(username, password)) {
            navigate('/athlete') 
        }
    }

    return(
        <div className="LoginComponent">
           <h3>Login please!</h3> 
           
           <div className="loginForm">
                <div>
                    <label>Username:</label>
                    <input type = "text" name = "username" value = {username} onChange = {handleUsernameChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type = "text" name = "password" value = {password} onChange = {handlePasswordChange} />
                </div>
           </div>
           <button className = "btn btn-primary m-2" onClick = {handleSubmit}>Login</button>
        </div>
    )
}