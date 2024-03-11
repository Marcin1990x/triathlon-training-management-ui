import { useState } from "react"

const NewTrainingPlanComponent = () => {

    const [sport, setSport] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleSelectSportChange = (event) => {
        setSport(event.target.value)
    }
    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <label className = "form-label">Choose sport type:</label>
                    <select className="form-select m-2" aria-label="Default select example" value = {sport} onChange={handleSelectSportChange}>
                        <option selected>Open this select menu</option>
                        <option value="SWIM">Swim</option>
                        <option value="BIKE">Bike</option>
                        <option value="RUN">Run</option>
                        <option value="WEIGHT">Weight</option>
                    </select>
                </div>
                <div className="col"></div>
            </div>  
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <label className = "form-label">Plan name:</label>
                        <input type = "text" name = "name" className = "form-control" value = {name} 
                            onChange = {handleNameChange} required/>
                </div>
                <div className="col"></div>    
            </div>  
            <div className="row">   
                <div className="col"></div>
                <div className="col">   
                    <label className = "form-label">Description:</label>
                        <input type = "text" name = "description" className = "form-control" value = {description} 
                            onChange = {handleDescriptionChange} required/>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default NewTrainingPlanComponent