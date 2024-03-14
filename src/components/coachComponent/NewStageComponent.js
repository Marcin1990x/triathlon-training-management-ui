import { useState } from "react"
import { addNewSwimStageToTrainingPlanApi } from "../api/StageApiService"
import { getTrainingPlanByIdApi } from "../api/TrainingPlanApiService"
import { useDataContextTrainings } from "./contexts/DataContextTrainings"
import { toast } from "react-hot-toast"

const NewStageComponent = ({planId, stageType}) => {

    const [trainingPlan, setTrainingPlan] = useState(null)
    const [sequence, setSequence] = useState(1)
    const successToast = (message) => toast.success(message)
    const errorToast = (message) => toast.error(message)
    const dataContextTrainings = useDataContextTrainings()

    const refreshPlan = () => {
        getTrainingPlanByIdApi(planId)
            .then(response => {
                console.log(response)
                setTrainingPlan(response.data)
            })
            .catch(error => console.log(error))
    }

    const [formFields, setFormFields] = useState({
        distance: 0,
        time: 0,
        heartRate: 0,
        description: '',
        repeat: 1,
        power: 0,
        runPace: 0,
        swimPace: 0
    })
    const handleFieldChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name] : value})
    }
    const handleSubmit = (event) => {
        
        event.preventDefault()

        const stage = {
            distanceInMeters : formFields.distance,
            timeInSeconds : formFields.time,
            sequence : sequence,
            heartRate : formFields.heartRate,
            description : formFields.description,
            power : formFields.power,
            paceInSecondsPerKm : formFields.runPace,
            paceInSeconds : formFields.swimPace
        }
        addNewSwimStageToTrainingPlanApi(planId, stage, stageType.toLowerCase())
            .then(response => {
                console.log(response)
                refreshPlan()
                setSequence(sequence + 1)
            })
            .catch(error => console.log(error))
    }

    const handleAddTrainingPlanBtn = () => {

        dataContextTrainings.switchView()
        dataContextTrainings.getCoachTrainingPlans()
        successToast(`New training plan added successfully.`)
    }
    const handleCancelBtn = () => {

        dataContextTrainings.switchView()
        dataContextTrainings.getCoachTrainingPlans()
        errorToast(`Adding stages canceled.`)
    }

    return (
        <div className="stage">
            <h3>Add training plan stages:</h3>
            <br></br>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5>Add new stage:</h5>
                            <form onSubmit={handleSubmit}>
                                <label className = "form-label">Sequence:</label>
                                <input type = "number" name = "sequence" className = "form-control" value = {sequence} disabled = {true}/>
                                <label className = "form-label">Distance [m]:</label>
                                <input type = "number" name = "distance" className = "form-control" value = {formFields.distance}
                                    onChange = {handleFieldChange}/>
                                <label className = "form-label">Time [s]:</label>
                                <input type = "number" name = "time" className = "form-control" value = {formFields.time}
                                    onChange = {handleFieldChange}/>
                                <label className = "form-label">Heart rate:</label>
                                <input type = "number" name = "heartRate" className = "form-control" value = {formFields.heartRate}
                                    onChange = {handleFieldChange}/>
                                {stageType == 'BIKE' && 
                                <div>
                                    <label className = "form-label">Power:</label>
                                    <input type = "number" name = "power" className = "form-control" value = {formFields.power}
                                        onChange = {handleFieldChange}/> 
                                </div>
                                }
                                {stageType == 'RUN' && 
                                <div>
                                    <label className = "form-label">Pace per km [s]:</label> 
                                    <input type = "number" name = "runPace" className = "form-control" value = {formFields.runPace}
                                        onChange = {handleFieldChange}/> 
                                </div>
                                }
                                {stageType == 'SWIM' && 
                                <div>
                                    <label className = "form-label">Pace per 100m [s]:</label>
                                    <input type = "number" name = "swimPace" className = "form-control" value = {formFields.swimPace}
                                        onChange = {handleFieldChange}/>
                                </div>
                                }
                                <label className = "form-label">Description:</label>
                                <input type = "text" name = "description" className = "form-control" value = {formFields.description}
                                    onChange = {handleFieldChange}/>
                                <label className = "form-label">Repeat?</label>
                                <select className="form-select" name ="repeat" value = {formFields.repeat} onChange={handleFieldChange}>
                                    {[...Array(10).keys()].map(option => (
                                        <option key={option + 1} value={option + 1}>{option + 1}</option>
                                    ))}
                                </select>
                                <button className="btn btn-outline-success m-2" type = "submit">Submit</button>
                            </form>
                        </div>
                        <div className="col"><h5>Stages:</h5>
                        <table className = "table">
                            <thead>
                                <tr>
                                    <th>Sequence</th>
                                    <th>Distance</th>
                                    <th>Time</th>
                                    <th>Heart rate</th>
                                    {stageType == 'BIKE' && <th>Power</th>}
                                    {(stageType == 'RUN' || stageType == 'SWIM') && <th>Pace</th>}
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {trainingPlan && 
                                trainingPlan.stage?.map (
                                    (stage) => (
                                        <tr key={stage.id}>
                                            <td>{stage.sequence}</td>
                                            <td>{stage.distanceInMeters}</td>
                                            <td>{stage.timeInSeconds}</td>
                                            <td>{stage.heartRate}</td>
                                            {stageType == 'BIKE' && <td>{stage.power}</td>}
                                            {stageType == 'RUN' && <td>{stage.paceInSecondsPerKm}</td>}
                                            {stageType == 'SWIM' && <td>{stage.paceInSeconds}</td>}
                                            <td>{stage.description}</td>
                                        </tr>
                                    )
                                )
                            }
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-outline-success m-2" onClick={() => handleAddTrainingPlanBtn()}>Add training plan</button>
                            <button className="btn btn-outline-danger m-2" onClick={() => handleCancelBtn()}>Cancel</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default NewStageComponent