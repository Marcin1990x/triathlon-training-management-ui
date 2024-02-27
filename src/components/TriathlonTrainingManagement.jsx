import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import AthleteComponent from "./athleteComponent/AthleteComponent";
import AuthProvider from "./security/AuthContext";

export default function TriathlonTrainingManagement() {
    return(
        <div className="TriathlonTrainingManager">
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path = '/' element = { <LoginComponent /> } />
                        <Route path = '/athlete' element = { <AthleteComponent /> } />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>    
        </div>
    )
}