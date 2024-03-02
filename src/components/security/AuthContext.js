import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService"
import { apiClient } from "../api/ApiClient";
import { refreshAccessTokenForUserApi } from "../api/UserApiService";

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}) {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [athleteId, setAthleteId] = useState(null)
    const [hasRefreshToken, setHasRefreshToken] = useState(false)
    const [stravaAccessExpiresAt, setStravaAccessExpiresAt] = useState(null)

    async function login (username, password) {

        try {
            const response = await executeJwtAuthenticationService(username, password)
            
            if(response.status == 200) {

                const token = response.headers.get("Authorization")
                
                setToken(token)
                setAuthenticated(true)
                setUserId(response.data.userId)
                setAthleteId(response.data.athleteId)
                setHasRefreshToken(response.data.hasRefreshToken)
                setStravaAccessExpiresAt(response.data.stravaAccessExpiresAt)

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
        setUserId(null)
        setAthleteId(null)
        setHasRefreshToken(false)
        setStravaAccessExpiresAt(null)
    }

    function refreshAccessToken() {
        refreshAccessTokenForUserApi(userId)
            .then(response => {
                console.log(response)
                return true 
            })
            .catch(error => {
                console.log(error)
                return false
            })
    }

    return (
        <AuthContext.Provider value = {{login, token, isAuthenticated, userId, athleteId, 
                                hasRefreshToken, stravaAccessExpiresAt, refreshAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}

