import { useEffect, useState } from "react"
import CoachAthletesComponent from "./CoachAthletesComponent"
import CoachTrainingPlansComponent from "./CoachTrainingPlansComponent"
import CoachTrainingPlanDetailsComponent from "./CoachTrainingPlanDetailsComponent"
import { getAthletesByCoachIdApi } from "../api/AthletesApiService"
import { useAuth } from "../security/AuthContext"
import { getTrainingPlansByCoachIdApi } from "../api/TrainingPlanApiService"

export default function CoachComponent() {

    const authContext = useAuth()

    const [athletes, setAthletes] = useState([])
    const [plans, setPlans] = useState([])

    useEffect( () => {
        getAthletes()
        getTrainingPlans()
    }, [])


    function getAthletes() {
        getAthletesByCoachIdApi(authContext.coachId)
            .then(response => {
                console.log(response)
                setAthletes(response.data)
            })
            .catch(error => console.log(error))
    }
    function getTrainingPlans() {
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
            <h2>Coach page</h2>

            <div className="row">
                <div className="col">
                    <CoachAthletesComponent athletes = {athletes}/>
                </div>
                <div className="col">
                    <CoachTrainingPlansComponent trainingPlans = {plans} setActivePlan={activatePlan}/>
                </div>
                <div className="col">
                    <CoachTrainingPlanDetailsComponent activePlan = {activePlan}/>
                </div>
            </div>
        </div>
    )
}