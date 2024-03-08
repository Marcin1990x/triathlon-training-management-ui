import { useEffect, useState } from "react"
import CoachAthletesComponent from "./CoachAthletesComponent"
import CoachTrainingPlansComponent from "./CoachTrainingPlansComponent"
import CoachTrainingPlanDetailsComponent from "./CoachTrainingPlanDetailsComponent"
import CoachAthleteWeek from "./CoachAthleteWeek"
import { getAthletesByCoachIdApi } from "../api/AthletesApiService"
import { useAuth } from "../security/AuthContext"
import { getTrainingPlansByAthleteIdApi, getTrainingPlansByCoachIdApi, removeTrainingPlanFromAthleteApi } from "../api/TrainingPlanApiService"
import { getTrainingRealizationsByAthleteIdApi } from "../api/TrainingRealizationApiService"
import { Toaster, toast } from "react-hot-toast"

export default function CoachComponent() {

    const authContext = useAuth()

    const [athletes, setAthletes] = useState([])
    const [athleteId, setAthleteId] = useState(null)
    const [plans, setPlans] = useState([])

    const [athleteView, setAthleteView] = useState(true) 

    const successToast = (message) => toast.success(message)

    const toggleView = () => {
        setAthleteView(!athleteView)
    }
    const buttonText = () => {
        return athleteView ? 'See trainings' : 'See athletes';
    }

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
                setAthleteId(id)
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
    const removeTrainingPlan = (id) => {
        removeTrainingPlanFromAthleteApi(athleteId, id)
            .then(reponse => {
                console.log(reponse)
                setPlansAndRealizationsForAthlete(athleteId)
                successToast('Training plan deleted successfully.')
            })
            .catch(error => console.log(error))
    }

    return (
        <div className = "CoachComponent">

            <Toaster toastOptions={{duration: 2000}}/>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>Coach page</h2> 
                        <button className="btn btn-primary float-end m-2" onClick={toggleView}>{buttonText()}</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {athleteView && <CoachAthletesComponent athletes = {athletes} onClickAthlete = {setPlansAndRealizationsForAthlete}/>}
                        {!athleteView && <CoachTrainingPlansComponent trainingPlans = {plans} setActivePlan={activatePlan}/> }
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {athleteView && <CoachAthleteWeek removeTrainingPlan={removeTrainingPlan} plans = {athletePlans} realizations = {athleteRealizations}/> }
                        {!athleteView && <CoachTrainingPlanDetailsComponent activePlan = {activePlan}/> }
                    </div>
                </div>
            </div>
        </div>
    )
}