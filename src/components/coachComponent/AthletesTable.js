import { useDataContext } from "./contexts/DataContext"
import { useWeekdayListVisibility } from "./contexts/WeekdayListVisibilityContext"

const AthletesTable = ({ athletes }) => {

    const listVisibility = useWeekdayListVisibility()
    const dataContext = useDataContext()

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete) => (
            <tr key={athlete.id}>
              <td>{athlete.id}</td>
              <td>{athlete.firstName}</td>
              <td>{athlete.lastName}</td>
              <td>
                <button className="btn btn-outline-primary" onClick={() => 
                  {dataContext.setPlansAndRealizationsForAthlete(athlete.id); listVisibility.setVisibility(true)}}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default AthletesTable