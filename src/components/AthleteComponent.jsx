import { useEffect, useState } from "react"
import { getTrainingPlansByAthleteId } from "./api/TrainingPlanApiService"
import { getTrainingRealizationsByAthleteId } from "./api/TrainingRealizationApiService"
import { trainingPlanTableHeaders, trainingRealizationTableHeaders } from "./labels/TableLabels"

export default function AthleteComponent() {

    const [trainingPlans, setTrainingPlans] = useState([])
    const [trainingRealizations, setTrainingRealizations] = useState([])

    useEffect ( () => {
         getTrainingPlans()
         getTrainingRealizations()
        }, [] )
         

    function getTrainingPlans() {
        getTrainingPlansByAthleteId(1)  // hardcoded temp
            .then(response => {
                console.log(response)
                setTrainingPlans(response.data)
            })
            .catch(error => console.log(error))
    }
    function getTrainingRealizations() {
        getTrainingRealizationsByAthleteId(1) // hardcoded temp
            .then(response => {
                console.log(response)
                setTrainingRealizations(response.data)
            })
            .catch(error => console.log(error))
    }

    return(
        <div className="AthleteComponent">
            <h2>Athlete component</h2>

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
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}