import { useEffect, useState } from "react"
import { getTrainingPlansByAthleteId } from "../api/TrainingPlanApiService"
import { getTrainingRealizationsByAthleteId, synchronizeActivitiesForAthleteApi } from "../api/TrainingRealizationApiService"
import { useAuth } from "../security/AuthContext"
import moment from 'moment'
import WeekdayList from "./WeekdayList"
import TrainingView from "./TrainingView"

export default function AthleteComponent() {

    const authContext = useAuth()

    const [trainingPlans, setTrainingPlans] = useState([])
    const [trainingRealizations, setTrainingRealizations] = useState([])

    const [render, setRender] = useState(0)

    function reRender() {
        setRender(render + 1)
    }

    useEffect ( () => {
         getTrainingPlans()
         getTrainingRealizations()
        }, [render] )
         

    function getTrainingPlans() {
        getTrainingPlansByAthleteId(authContext.athleteId)
            .then(response => {
                console.log(response)
                setTrainingPlans(response.data)
            })
            .catch(error => console.log(error))
    }
    function getTrainingRealizations() {
        getTrainingRealizationsByAthleteId(authContext.athleteId)
            .then(response => {
                console.log(response)
                setTrainingRealizations(response.data)
            })
            .catch(error => console.log(error))
    }
    function handleSynchronizeButton() {
        if(isAccessTokenNotExpired()){
            if(authContext.refreshAccessToken()){
                synchronizeActivitiesForAthlete()
                setRender(render + 1)
            }
        } else {
            synchronizeActivitiesForAthlete()
        }
    }
    function isAccessTokenNotExpired() {
        var currentTime = moment()
        var givenTime = moment(authContext.stravaAccessExpiresAt * 1000)
        if(givenTime.isBefore(currentTime)) {
            console.log(authContext.stravaAccessExpiresAt)
            return true
        }
        return false
    }
    function synchronizeActivitiesForAthlete() {
        synchronizeActivitiesForAthleteApi(authContext.athleteId)
            .then(response => {
                console.log(response)
                setRender(render + 1)
            })
            .catch(error => console.log(error))
    }

    const [activeTraining, setActiveTraining] = useState(null)
    function setActiveTrainingFunction(training) {
        setActiveTraining(training)
    }

    return(
        <div className="AthleteComponent">

            <h2>Athlete page</h2>

            <WeekdayList plans = {trainingPlans} realizations = {trainingRealizations} onDayFieldClick = {setActiveTrainingFunction}/>

            <div className="training-box">
                <TrainingView training = {activeTraining} refreshUpdatedTraining = {setActiveTrainingFunction} refreshTrainings = {reRender}/> 
            </div>

            {/* <button onClick={() => {console.log(activeTraining)}}>test</button> */}
            <button className = "btn btn-outline-success m-2" onClick = {() => handleSynchronizeButton()}>Synchronize with Strava</button>
        </div>
    )
}