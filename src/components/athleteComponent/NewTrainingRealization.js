import { useState } from "react"
import { addNewTrainingRealizationForAthlete } from "../api/TrainingRealizationApiService"
import { useAuth } from "../security/AuthContext"
import { toast } from "react-hot-toast"
import { useDataContextAthlete } from "./contexts/DataContextAthlete"

const NewTrainingRealization = ({toggleView}) => {

    const {athleteId} = useAuth()
    const {getTrainingRealizations} = useDataContextAthlete()
    const successToast = (message) => toast.success(message)

    const [formFields, setFormFields] = useState({
        sport: 'RUN',
        name: '',
        date: '',
        distance: 0,
        time: 0,
        averageWatts: 0,
        maxWatts: 0,
        averageHeartRate: 0,
        maxHeartRate: 0,
        description: '',
        feelings: 'NORMAL',
        rpeLevel: 0
    })
    const handleFieldChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name] : value})
    }

    const handleAddRealization = (event) => {

        event.preventDefault()

        const newTraining = {
            name: formFields.name,
            distanceInMeters: formFields.distance,
            timeInSeconds: formFields.time,
            type: formFields.sport,
            realizationDate: formFields.date,
            averageWarrs: formFields.averageWatts,
            maxWatts: formFields.maxWatts,
            averageHeartrate: formFields.averageHeartRate,
            maxHeartrate: formFields.maxHeartRate,
            realizationDescription: formFields.description,
            feelings: formFields.feelings,
            rpeLevel: formFields.rpeLevel
        }

        addNewTrainingRealizationForAthlete(athleteId, newTraining)
            .then(response => {
                console.log(response)
                successToast('New training realization added successfully.')
                getTrainingRealizations()
                toggleView()
            })
            .catch(error => console.log(error))

    }
    return (
        <div className="newTrainingRealizaion">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                <form onSubmit = {handleAddRealization}>   
                    <label className = "form-label">Choose sport type:</label>
                    <select className="form-select m-2" name = "sport" value = {formFields.sport} onChange={handleFieldChange}>
                        <option value="SWIM">Swim</option>
                        <option value="BIKE">Bike</option>
                        <option value="RUN">Run</option>
                        <option value="WEIGHT">Weight</option>
                    </select>
                    <label className = "form-label">Training name:</label>
                    <input type = "text" name = "name" className = "form-control" value = {formFields.name}
                        onChange = {handleFieldChange} required/>
                    <label className = "form-label">Realization date:</label>
                    <input type = "text" name = "date" className = "form-control" value = {formFields.date}
                        onChange = {handleFieldChange} required/>
                    {formFields.sport != 'WEIGHT' &&
                    <div>
                        <label className = "form-label">Distance:</label>
                        <input type = "number" name = "distance" className = "form-control" value = {formFields.distance}
                            onChange = {handleFieldChange} required/>
                    </div>
                    }
                    <label className = "form-label">Time:</label>
                    <input type = "number" name = "time" className = "form-control" value = {formFields.time}
                        onChange = {handleFieldChange} required/>
                    {formFields.sport == 'BIKE' &&
                    <div>
                        <label className = "form-label">Average watts:</label>
                        <input type = "number" name = "averageWatts" className = "form-control" value = {formFields.averageWatts}
                                onChange = {handleFieldChange}/>
                        <label className = "form-label">Maximum watts:</label>
                        <input type = "number" name = "maxWatts" className = "form-control" value = {formFields.maxWatts}
                            onChange = {handleFieldChange}/>
                    </div>
                    }
                    <label className = "form-label">Average heart rate:</label>
                    <input type = "number" name = "averageHeartRate" className = "form-control" value = {formFields.averageHeartRate}
                        onChange = {handleFieldChange}/>
                    <label className = "form-label">Maximum heart rate:</label>
                    <input type = "number" name = "maxHeartRate" className = "form-control" value = {formFields.maxHeartRate}
                        onChange = {handleFieldChange}/>
                    <label className = "form-label">Description:</label>
                    <input type = "text" name = "description" className = "form-control" value = {formFields.description}
                        onChange = {handleFieldChange}/>
                    <label className = "form-label">Feelings:</label>
                    <select className="form-select m-2" name = "feelings" value = {formFields.feelings} onChange={handleFieldChange}>
                        <option value="WEAK">Weak</option>
                        <option value="BAD">Bad</option>
                        <option value="NORMAL">Normal</option>
                        <option value="GOOD">Good</option>
                        <option value="STRONG">Strong</option>
                    </select>
                    <label className = "form-label">RPE level:</label>
                    <select className="form-select m-2" name = "rpeLevel" value = {formFields.rpeLevel} onChange={handleFieldChange}>
                        {[...Array(11).keys()].map(option => (
                                        <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <button className="btn btn-outline-success m-2" type = "submit">Add training</button>
                </form>         
                </div>
                <div className="col"></div>
            </div>  
        </div>
    )
}
export default NewTrainingRealization