import { useState } from "react"
import { addNewSwimStageToTrainingPlanApi } from "../api/StageApiService"

const BikeStageForm = ({trainingPlan}) => {

    const [formFields, setFormFields] = useState({
        sequence: 0,
        distance: 0,
        time: 0,
        heartRate: 0,
        power: 0,
        description: '',
        repeat: 1
    })
    const handleFieldChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name] : value})
    }
    const handleSubmit = (event) => {
        
        event.preventDefault()
        console.log(formFields)
        console.log(trainingPlan)

        const stage = {
            distanceInMeters : formFields.distance,
            timeInSeconds : formFields.time,
            sequence : formFields.sequence,
            heartRate : formFields.heartRate,
            description : formFields.description,
            power : formFields.power
        }

        addNewSwimStageToTrainingPlanApi(trainingPlan.id, stage)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    return (
        <div className="bike-stage">
            <h3>Add Bike training plan stages:</h3>
            <br></br>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5>Add new stage:</h5>
                            <form onSubmit={handleSubmit}>
                                <label className = "form-label">Sequence:</label>
                                <input type = "number" name = "sequence" className = "form-control" value = {formFields.sequence}
                                    onChange = {handleFieldChange}/>
                                <label className = "form-label">Distance [m]:</label>
                                <input type = "number" name = "distance" className = "form-control" value = {formFields.distance}
                                    onChange = {handleFieldChange}/>
                                <label className = "form-label">Time [s]:</label>
                                <input type = "number" name = "time" className = "form-control" value = {formFields.time}
                                    onChange = {handleFieldChange}/>
                                <label className = "form-label">Heart rate:</label>
                                <input type = "number" name = "heartRate" className = "form-control" value = {formFields.heartRate}
                                    onChange = {handleFieldChange}/>
                                <label className = "form-label">Power:</label>
                                <input type = "number" name = "power" className = "form-control" value = {formFields.power}
                                    onChange = {handleFieldChange}/>
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
                        <div className="col"><h5>Stages:</h5></div>
                    </div>
                </div>
        </div>
    )
}

export default BikeStageForm