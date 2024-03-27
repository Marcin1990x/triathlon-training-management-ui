import { useState } from "react"

const NewTrainingRealization = () => {

    const [sport, setSport] = useState('BIKE')
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [distance, setDistance] = useState(0)
    const [time, setTime] = useState(0)
    const [averageWatts, setAverageWatts] = useState(0)
    const [maxWatts, setMaxWatts] = useState(0)
    const [averageHeartRate, setAverageHeartRate] = useState(0)
    const [maxHeartRate, setMaxHeartRate] = useState(0)
    const [description, setDescription] = useState('')
    const [feelings, setFeelings] = useState('')
    const [rpeLevel, setRpeLevel] = useState(0)


    const [next, setNext] = useState(false)

    const handleSelectSportChange = (event) => {
        setSport(event.target.value)
    }
    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleDateChange = (event) => {
        setDate(event.target.value)
    }
    const handleDistanceChange = (event) => {
        setDistance(event.target.value)
    }
    const handleTimeChange = (event) => {
        setTime(event.target.value)
    }
    const handleAverageWattsChange = (event) => {
        setAverageWatts(event.target.value)
    }
    const handleMaxWattsChange = (event) => {
        setMaxWatts(event.target.value)
    }
    const handleMaxHeartRateChange = (event) => {
        setMaxHeartRate(event.target.value)
    }
    const handleAverageHeartRateChange = (event) => {
        setAverageHeartRate(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const handleFeelingsChange = (event) => {
        setFeelings(event.target.value)
    }
    const handleRpeLevelChange = (event) => {
        setRpeLevel(event.target.value)
    }

    const handleNextBtn = () => {
        setNext(true)
    }


    return (
        <div className="newTrainingRealizaion">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <label className = "form-label">Choose sport type:</label>
                    <select className="form-select m-2" value = {sport} onChange={handleSelectSportChange} disabled = {next}>
                        <option value="SWIM">Swim</option>
                        <option value="BIKE">Bike</option>
                        <option value="RUN">Run</option>
                        <option value="WEIGHT">Weight</option>
                    </select>
                    <label className = "form-label">Training name:</label>
                    <input type = "text" name = "name" className = "form-control" value = {name} disabled = {next}
                        onChange = {handleNameChange} required/>
                    <label className = "form-label">Realization date:</label>
                    <input type = "text" name = "date" className = "form-control" value = {date} disabled = {next}
                        onChange = {handleDateChange} required/>
                    <button className="btn btn-outline-success m-2" onClick={() => handleNextBtn()}>Next</button>
                    {next &&
                        <div>
                        <label className = "form-label">Distance:</label>
                        <input type = "number" name = "distance" className = "form-control" value = {distance}
                            onChange = {handleDistanceChange} required/>
                        <label className = "form-label">Time:</label>
                        <input type = "number" name = "time" className = "form-control" value = {time}
                            onChange = {handleTimeChange} required/>
                        <label className = "form-label">Average watts:</label>
                        <input type = "number" name = "averageWatts" className = "form-control" value = {averageWatts}
                            onChange = {handleAverageWattsChange}/>
                        <label className = "form-label">Maximum watts:</label>
                        <input type = "number" name = "maxWatts" className = "form-control" value = {maxWatts}
                            onChange = {handleMaxWattsChange}/>
                        <label className = "form-label">Average heart rate:</label>
                        <input type = "number" name = "averageHeartRate" className = "form-control" value = {averageHeartRate}
                            onChange = {handleAverageHeartRateChange}/>
                        <label className = "form-label">Maximum heart rate:</label>
                        <input type = "number" name = "maxHeartRate" className = "form-control" value = {maxHeartRate}
                            onChange = {handleMaxHeartRateChange}/>
                        <label className = "form-label">Description:</label>
                        <input type = "text" name = "description" className = "form-control" value = {description}
                            onChange = {handleDescriptionChange}/>
                        <label className = "form-label">Feelings:</label>
                        <input type = "text" name = "feelings" className = "form-control" value = {feelings}
                            onChange = {handleFeelingsChange}/>
                        <label className = "form-label">RPE level:</label>
                        <input type = "number" name = "rpeLevel" className = "form-control" value = {rpeLevel}
                            onChange = {handleRpeLevelChange}/>
                        </div>
                    }
                </div>
                <div className="col"></div>
            </div>  
        </div>
    )
}
export default NewTrainingRealization