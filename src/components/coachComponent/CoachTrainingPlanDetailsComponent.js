import { removeTrainingPlanApi } from "../api/TrainingPlanApiService"
import { useDataContextTrainings } from "./contexts/DataContextTrainings"
import { toast } from "react-hot-toast"

const CoachTrainingPlanDetailsComponent = () => {

    const dataContextTrainings = useDataContextTrainings()

    const successToast = (message) => toast.success(message)

    const plan = dataContextTrainings.activePlan

    const handleDeleteBtn = (id) => {
        removeTrainingPlanApi(id)
            .then(response => { 
                console.log(response)
                dataContextTrainings.getCoachTrainingPlans()
                dataContextTrainings.activatePlan(null)
                successToast('Training plan deleted.')
            })
    }
    const Stages = () => {
        if(plan.stage.length > 0) {
            return (
                <div className="table-responsive" style={{ maxHeight: '270px', overflowY: 'auto' }}>
                    Stages
                    <table className="table table-striped" >
                        <thead>
                        <tr>
                            <th>Sequence</th>
                            <th>Time</th>
                            <th>Distance</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                            {plan.stage.map((stage) => 
                                <tr key = {stage.sequence}>
                                <td>{stage.sequence}</td>
                                <td>{stage.timeInSeconds}</td>
                                <td>{stage.distanceInMeters}</td>
                                <td>{stage.description}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    return (
        <div>
            <h5>Training plan:</h5>
            <br/>
            {plan && 
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Number: {plan.id}</li>
                <li className="list-group-item">Name: {plan.name}</li>
                <li className="list-group-item">Description: {plan.description}</li>
                <li className="list-group-item">
                    <button className="btn btn-outline-danger m-1" onClick={() => handleDeleteBtn(plan.id)}>Delete training plan</button>
                </li>
            </ul> }
            {plan && <Stages/>}            
        </div>
    )
}
export default CoachTrainingPlanDetailsComponent