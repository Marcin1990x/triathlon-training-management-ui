import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService"
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}) {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [token, setToken] = useState(null)

    async function login (username, password) {

        try {
            const response = await executeJwtAuthenticationService(username, password)
            
            if(response.status == 200) {

                const token = response.headers.get("Authorization")
                
                setToken(token)
                setAuthenticated(true)

                apiClient.interceptors.request.use (
                        (config) => {
                            config.headers.Authorization = token
                            return config
                        }
                    )
                return true
            } else {
                logout()
                return false
            }
 
        } catch (error) {
            logout()
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
        setToken(null)
    }

    return (
        <AuthContext.Provider value = {{login, token, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

