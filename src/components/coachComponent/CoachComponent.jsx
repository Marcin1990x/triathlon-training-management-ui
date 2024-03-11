import { useEffect, useState } from "react"
import CoachAthletesComponent from "./CoachAthletesComponent"
import CoachTrainingPlansComponent from "./CoachTrainingPlansComponent"
import CoachTrainingPlanDetailsComponent from "./CoachTrainingPlanDetailsComponent"
import CoachAthleteWeek from "./CoachAthleteWeek"
import { getAthletesByCoachIdApi } from "../api/AthletesApiService"
import { useAuth } from "../security/AuthContext"
import { Toaster } from "react-hot-toast"
import { useDataContextAthletes } from "./contexts/DataContextAthletes"
import { useDataContextTrainings } from "./contexts/DataContextTrainings"

export default function CoachComponent() {

    const authContext = useAuth()
    const dataContextAthletes = useDataContextAthletes()
    const dataContextTrainings = useDataContextTrainings()

    const [athletes, setAthletes] = useState([])

    const buttonText = () => {
        return dataContextAthletes.athleteView ? 'See trainings' : 'See athletes';
    }

    useEffect( () => {
        getAthletes()
        dataContextTrainings.getCoachTrainingPlans()
    }, [])

    function getAthletes() {
        getAthletesByCoachIdApi(authContext.coachId)
            .then(response => {
                console.log(response)
                setAthletes(response.data)
            })
            .catch(error => console.log(error))
    }
    return (
        <div className = "CoachComponent">

            <Toaster toastOptions={{duration: 4000}}/>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>Coach page</h2> 
                        {!dataContextAthletes.addPlanMode && 
                            <button className = "btn btn-primary float-end m-2" onClick = {dataContextAthletes.toggleView}>{buttonText()}</button> 
                        }
                        {dataContextAthletes.addPlanMode &&
                            <button className = "btn btn-warning m-2" 
                                onClick = {() => dataContextAthletes.handleAddPlanMode(false)}>Cancel adding plan
                            </button>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {dataContextAthletes.athleteView && <CoachAthletesComponent athletes = {athletes}/>}
                        {!dataContextAthletes.athleteView && <CoachTrainingPlansComponent/> }
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {dataContextAthletes.athleteView && <CoachAthleteWeek/>}
                        {!dataContextAthletes.athleteView && <CoachTrainingPlanDetailsComponent/> }
                    </div>
                </div>
            </div>
        </div>
    )
}