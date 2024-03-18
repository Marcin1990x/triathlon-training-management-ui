import { useState } from "react"
import { toast } from "react-hot-toast"
import { registerUserApi } from "../api/RegisterApiService"

const RegisterComponent = () => {

    const successToast = (message) => toast.success(message)
    const errorToast = (message) => toast.error(message)

    const [registered, setRegistered] = useState(false)

    const [formFields, setFormFields] = useState({
        username: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
    })
    const handleFieldChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }
    const handleRegisterUser = (event) => {

        event.preventDefault()
        
        const user = {
            username: formFields.username,
            emailAddress: formFields.emailAddress,
            password: formFields.password
        }
        if(user.password == formFields.confirmPassword) {
            registerUserApi(user)
                .then(response => {
                    successToast('Registration successful! Welcome aboard ' + user.username + '!')
                    setRegistered(true)
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                    errorToast(error.response.data.message)
                })
        } else {
            errorToast("Oops! It seems like the passwords don't match.")
        }
    }

    return (
        <div className="register">
            {!registered &&
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <h5>Register</h5>
                        <form onSubmit={handleRegisterUser}>
                            <label className = "form-label">Username:</label>
                            <input type = "text" name = "username" className = "form-control" value = {formFields.username}
                                onChange = {handleFieldChange}/>
                            <label className = "form-label">Password:</label>
                            <input type = "password" name = "password" className = "form-control" value = {formFields.password}
                                onChange = {handleFieldChange}/>
                            <label className = "form-label">Repeat password:</label>
                            <input type = "password" name = "confirmPassword" className = "form-control" value = {formFields.confirmPassword}
                                onChange = {handleFieldChange}/>
                            <label className = "form-label">E-mail address:</label>
                            <input type = "email" name = "emailAddress" className = "form-control" value = {formFields.emailAddress}
                                onChange = {handleFieldChange}/>
                            <button className="btn btn-outline-success m-2" type = "submit">Register</button>
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
            }
            {registered &&
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col">Who you want to be? Coach or Athlete?</div>
                    <div className="col"></div>
                </div>
            </div>
            }
        </div>
    )
} 

export default RegisterComponent