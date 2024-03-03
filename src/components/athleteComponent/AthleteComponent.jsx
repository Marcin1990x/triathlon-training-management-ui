import { useEffect, useState } from "react"
import { getTrainingPlansByAthleteId } from "../api/TrainingPlanApiService"
import { getTrainingRealizationsByAthleteId, synchronizeActivitiesForAthleteApi } from "../api/TrainingRealizationApiService"
import { trainingPlanTableHeaders, trainingRealizationTableHeaders } from "../labels/TableLabels"
import { useAuth } from "../security/AuthContext"
import moment from 'moment'
import WeekdayList from "./WeekdayList"
import TrainingView from "./TrainingView"

export default function AthleteComponent() {

    const authContext = useAuth()

    const [trainingPlans, setTrainingPlans] = useState([])
    const [trainingRealizations, setTrainingRealizations] = useState([])

    const [render, setRender] = useState(0)
    const reRender = () => {
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
    function updateTrainingRealization(id) {
        return (
            <button className="btn btn-outline-primary">add feelings</button>
        )
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
    function onTrainingClick(training) {
        setActiveTraining(training)
    }

    return(
        <div className="AthleteComponent">

            <h2>Athlete page</h2>

            <WeekdayList plans = {trainingPlans} realizations = {trainingRealizations} onDayFieldClick = {onTrainingClick}/>

            <div className="training-box">
                <TrainingView training = {activeTraining} render = {reRender} />
            </div>

            {/* <button onClick={() => {console.log(activeTraining)}}>test</button> */}

            <br></br>

            <h4>Training Plan calendar:</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {trainingPlanTableHeaders.map ( label => (<th>{label}</th> ) ) }
                    </tr>
                </thead>
                <tbody>
                    {
                        trainingPlans.map (
                            (plan) => (
                                <tr key={plan.id}>
                                    <td>{plan.plannedDate}</td>
                                    <td>{plan.trainingType}</td>
                                    <td>{plan.name}</td>
                                    <td>{plan.description}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            <br></br>
            <h4>Training Plan realization:</h4>

            <button className = "btn btn-outline-success m-2" onClick = {() => handleSynchronizeButton()}>Synchronize with Strava</button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        {trainingRealizationTableHeaders.map ( label => (<th>{label}</th> ) ) }
                    </tr>
                </thead>
                <tbody>
                    {
                        trainingRealizations.map (
                            (realization) => (
                                <tr key={realization.id}>
                                    <td>{realization.realizationDate}</td>
                                    <td>{realization.type}</td>
                                    <td>{realization.name}</td>
                                    <td>{realization.realizationDescription}</td>
                                    <td>{realization.distanceInMeters}</td>
                                    <td>{realization.timeInSeconds}</td>
                                    <td>{realization.feelings}</td>
                                    <td>{realization.rpeLevel}</td>
                                    <td>{updateTrainingRealization(realization.id)}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}