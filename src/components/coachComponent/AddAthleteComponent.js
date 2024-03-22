import { useState } from "react"
import { getByLastnameApi } from "../api/AthletesApiService"

const AddAthleteComponent = () => {

    const [search, setSearch] = useState(false)
    const [lastname, setLastname] = useState('')
    const [athletes, setAthletes] = useState([])

    const handleFieldChange = (event) => {
        setLastname(event.target.value)
    }

    const handleSetSearchBtn = () => {
        setSearch(true)

        getByLastnameApi(lastname)
            .then(response => {
                console.log(response)
                setAthletes(response.data)
            })
            .catch(error => console.error(error))
    }
    const handleAddBtn = (id) => {
        console.log(id)
    }

    return (
        <div className="addAthleteComponent">
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <label className = "form-label">Find by lastname:</label>
                        <input type = "text" name = "sequence" className = "form-control" onChange={handleFieldChange}/>
                        <button className="btn btn-outline-primary m-2" onClick={() => handleSetSearchBtn()}>Search</button>
                        {search && 
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Lp.</th>
                                        <th>First name</th>
                                        <th>Last name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                       athletes.map((athlete, index) => (
                                            <tr key = {index}>
                                                <td>{index + 1}</td>
                                                <td>{athlete.firstName}</td>
                                                <td>{athlete.lastName}</td>
                                                <td><button className="btn btn-outline-primary" 
                                                    onClick={() => handleAddBtn(athlete.id)}>Add</button></td>
                                            </tr>
                                       )) 
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    ) 
}
export default AddAthleteComponent