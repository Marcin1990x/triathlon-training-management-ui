import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import AthleteComponent from "./athleteComponent/AthleteComponent";
import CoachComponent from "./coachComponent/CoachComponent";
import AuthProvider from "./security/AuthContext";
import WeekdayListVisibilityProvider from "./coachComponent/contexts/WeekdayListVisibilityContext";
import DataContextAthletesProvider from "./coachComponent/contexts/DataContextAthletes";
import DataContextTrainingsProvider from "./coachComponent/contexts/DataContextTrainings";
import HeaderComponent from "./header/HeaderComponent";

export default function TriathlonTrainingManagement() {
    return(
        <div className="TriathlonTrainingManager">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                        <WeekdayListVisibilityProvider>
                            <Routes>
                                <Route path = '/' element = { <LoginComponent /> } />
                                <Route path = '/athlete' element = { <AthleteComponent /> } />
                                <Route path = '/coach' element = 
                                    { 
                                    <DataContextAthletesProvider>
                                        <DataContextTrainingsProvider>
                                            <WeekdayListVisibilityProvider>
                                                <CoachComponent />
                                            </WeekdayListVisibilityProvider> 
                                        </DataContextTrainingsProvider>
                                    </DataContextAthletesProvider>
                                    } />
                            </Routes>
                        </WeekdayListVisibilityProvider>
                </BrowserRouter>
            </AuthProvider>    
        </div>
    )
}