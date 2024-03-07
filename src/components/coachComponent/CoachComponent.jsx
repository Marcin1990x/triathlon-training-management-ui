import { useEffect, useState } from "react"
import CoachAthletesComponent from "./CoachAthletesComponent"
import CoachTrainingPlansComponent from "./CoachTrainingPlansComponent"
import CoachTrainingPlanDetailsComponent from "./CoachTrainingPlanDetailsComponent"
import CoachAthleteWeek from "./CoachAthleteWeek"
import { getAthletesByCoachIdApi } from "../api/AthletesApiService"
import { useAuth } from "../security/AuthContext"
import { getTrainingPlansByAthleteIdApi, getTrainingPlansByCoachIdApi } from "../api/TrainingPlanApiService"
import { getTrainingRealizationsByAthleteIdApi } from "../api/TrainingRealizationApiService"

export default function CoachComponent() {

    const authContext = useAuth()

    const [athletes, setAthletes] = useState([])
    const [plans, setPlans] = useState([])

    useEffect( () => {
        getAthletes()
        getCoachTrainingPlans()
    }, [])

    const [athletePlans, setAthletePlans] = useState([])
    const [athleteRealizations, setAthleteRealizations] = useState([])

    function getTrainingPlans(id) { // extract to other file
        getTrainingPlansByAthleteIdApi(id)
            .then(response => {
                console.log(response)
                setAthletePlans(response.data)
            })
            .catch(error => console.log(error))
    }
    function getTrainingRealizations(id) { // extract to other file
        getTrainingRealizationsByAthleteIdApi(id)
            .then(response => {
                console.log(response)
                setAthleteRealizations(response.data)
            })
            .catch(error => console.log(error))
    }

    const setPlansAndRealizationsForAthlete = (id) => {
        getTrainingPlans(id)
        getTrainingRealizations(id)
    }

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
            <h2>Coach page</h2>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <CoachAthletesComponent athletes = {athletes} onClickAthlete = {setPlansAndRealizationsForAthlete}/>
                        <CoachAthleteWeek plans = {athletePlans} realizations = {athleteRealizations}/>
                    </div>
                    <div className="col-sm-4">
                        <CoachTrainingPlansComponent trainingPlans = {plans} setActivePlan={activatePlan}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        
                    </div>
                    <div className="col-sm-4">
                        <CoachTrainingPlanDetailsComponent activePlan = {activePlan}/>
                    </div>
                </div>
            </div>
        </div>
    )
}