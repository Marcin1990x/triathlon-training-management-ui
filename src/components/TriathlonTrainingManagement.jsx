import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import AthleteComponent from "./athleteComponent/AthleteComponent";
import CoachComponent from "./coachComponent/CoachComponent";
import AuthProvider from "./security/AuthContext";
import WeekdayListVisibilityProvider from "./coachComponent/contexts/WeekdayListVisibilityContext";

export default function TriathlonTrainingManagement() {
    return(
        <div className="TriathlonTrainingManager">
            <AuthProvider>
                <BrowserRouter>
                    <WeekdayListVisibilityProvider>
                        <Routes>
                            <Route path = '/' element = { <LoginComponent /> } />
                            <Route path = '/athlete' element = { <AthleteComponent /> } />
                            <Route path = '/coach' element = { <CoachComponent /> } />
                        </Routes>
                    </WeekdayListVisibilityProvider>
                </BrowserRouter>
            </AuthProvider>    
        </div>
    )
}