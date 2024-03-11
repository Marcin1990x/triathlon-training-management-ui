import { useState } from "react"
import { useDataContextAthletes } from "./contexts/DataContextAthletes"
import { useWeekdayListVisibility } from "./contexts/WeekdayListVisibilityContext"

const AthletesTable = ({ athletes }) => {

    const listVisibility = useWeekdayListVisibility()
    const DataContextAthletes = useDataContextAthletes()

    const [highlightedRow, setHighlightedRow] = useState(null)

    const handleRowClick = (index) => {
      setHighlightedRow(index)
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete, index) => (
            <tr key={athlete.id} className = {highlightedRow == index ? "table-warning" : ""}>
              <td>{athlete.firstName}</td>
              <td>{athlete.lastName}</td>
              <td>
                <button className="btn btn-outline-primary" onClick={() => 
                  {DataContextAthletes.setPlansAndRealizationsForAthlete(athlete.id); listVisibility.setVisibility(true)
                    handleRowClick(index)}}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default AthletesTable