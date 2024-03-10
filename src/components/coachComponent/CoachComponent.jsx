import { useEffect, useState } from "react"
import CoachAthletesComponent from "./CoachAthletesComponent"
import CoachTrainingPlansComponent from "./CoachTrainingPlansComponent"
import CoachTrainingPlanDetailsComponent from "./CoachTrainingPlanDetailsComponent"
import CoachAthleteWeek from "./CoachAthleteWeek"
import { getAthletesByCoachIdApi } from "../api/AthletesApiService"
import { useAuth } from "../security/AuthContext"
import { getTrainingPlansByCoachIdApi } from "../api/TrainingPlanApiService"
import { Toaster } from "react-hot-toast"
import { useDataContext } from "./contexts/DataContext"

export default function CoachComponent() {

    const authContext = useAuth()
    const dataContext = useDataContext()

    const [athletes, setAthletes] = useState([])
    const [plans, setPlans] = useState([])

    const buttonText = () => {
        return dataContext.athleteView ? 'See trainings' : 'See athletes';
    }

    useEffect( () => {
        getAthletes()
        getCoachTrainingPlans()
    }, [])

    function getAthletes() {
        getAthletesByCoachIdApi(authContext.coachId)
            .then(response => {
                console.log(response)
                setAthletes(response.data)
            })
            .catch(error => console.log(error))
    }
    function getCoachTrainingPlans() {
        getTrainingPlansByCoachIdApi(authContext.coachId)
            .then(response => {
                console.log(response)
                setPlans(response.data)
            })
            .catch(error => console.log(error))
    }

    const [activePlan, setActivePlan] = useState(null)
    function activatePlan(plan) {
        setActivePlan(plan)
    }

    return (
        <div className = "CoachComponent">

            <Toaster toastOptions={{duration: 4000}}/>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>Coach page</h2> 
                        {!dataContext.addPlanMode && 
                            <button className = "btn btn-primary float-end m-2" onClick = {dataContext.toggleView}>{buttonText()}</button> 
                        }
                        {dataContext.addPlanMode &&
                            <button className = "btn btn-warning m-2" 
                                onClick = {() => dataContext.handleAddPlanMode(false)}>Cancel adding plan
                            </button>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {dataContext.athleteView && <CoachAthletesComponent athletes = {athletes}/>}
                        {!dataContext.athleteView && <CoachTrainingPlansComponent trainingPlans = {plans} setActivePlan={activatePlan}/> }
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {dataContext.athleteView && <CoachAthleteWeek/>}
                        {!dataContext.athleteView && <CoachTrainingPlanDetailsComponent activePlan = {activePlan}/> }
                    </div>
                </div>
            </div>
        </div>
    )
}