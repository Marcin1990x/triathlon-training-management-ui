import { useWeekdayListVisibility } from "./contexts/WeekdayListVisibilityContext"

const AthletesTable = ({ athletes, onClickAthlete }) => {

    const listVisibility = useWeekdayListVisibility()

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
                  {onClickAthlete(athlete.id); listVisibility.setVisibility(true)}}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default AthletesTable