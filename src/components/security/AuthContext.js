import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService"

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}) {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [token, setToken] = useState(null)

    async function login (username, password) {

        try {
            const response = await executeJwtAuthenticationService(username, password)
            
            console.log(response)
 
        } catch (error) {
            console.log('My error' + error)
        }
    }

    return (
        <AuthContext.Provider value = {{login}}>
            {children}
        </AuthContext.Provider>
    )
}

