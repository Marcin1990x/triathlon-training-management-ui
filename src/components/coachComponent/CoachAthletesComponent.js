import AthletesTable from "./AthletesTable"

const CoachAthletesComponent = ({athletes}) => {

    return (
        <div>
            <h5>My athletes:</h5>
            <br/>
            <AthletesTable athletes={athletes}/>
        </div>
    )
}
export default CoachAthletesComponent