import { useEffect, useState } from "react"
import { synchronizeActivitiesForAthleteApi } from "../api/TrainingRealizationApiService"
import { useAuth } from "../security/AuthContext"
import moment from 'moment'
import WeekdayList from "./WeekdayList"
import TrainingView from "./TrainingView"
import { useDataContextAthlete } from "./contexts/DataContextAthlete"

export default function AthleteComponent() {

    const authContext = useAuth()
    const dataContextAthlete = useDataContextAthlete()

    const [render, setRender] = useState(0)

    function reRender() {
        setRender(render + 1)
    }

    useEffect ( () => {
        dataContextAthlete.getTrainingPlans()
        dataContextAthlete.getTrainingRealizations()
        }, [render])
         

    function handleSynchronizeButton() {
        if(isAccessTokenExpired()){
            if(authContext.refreshAccessToken()){
                synchronizeActivitiesForAthlete()
                setRender(render + 1)
            }
        } else {
            synchronizeActivitiesForAthlete()
        }
    }
    function isAccessTokenExpired() { // problem! fix
        console.log(authContext.stravaAccessExpiresAt)
        if(authContext.stravaAccessExpiresAt == null) {
            console.log('return true: no expiresAt')
            return true
        }
        var currentTime = moment()
        var givenTime = moment(authContext.stravaAccessExpiresAt * 1000)
        if(givenTime.isBefore(currentTime)) {
            console.log('return true: invalid accessToken')
            return true
        } else return false
    }
    function synchronizeActivitiesForAthlete() {
        synchronizeActivitiesForAthleteApi(authContext.athleteId)
            .then(response => {
                console.log(response)
                setRender(render + 1)
            })
            .catch(error => console.log(error))
    }
    return(
        <div className="AthleteComponent">

            <h2>Athlete page</h2>

            <WeekdayList/>

            <div className="training-box">
                <TrainingView refreshTrainings = {reRender}/> 
            </div>
            <button className = "btn btn-outline-primary m-2" onClick = {() => handleSynchronizeButton()}>Synchronize with Strava</button>
        </div>
    )
}