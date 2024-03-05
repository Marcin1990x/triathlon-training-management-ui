import AthletesTable from "./AthletesTable"

const CoachAthletesComponent = (props) => {

    return (
        <div>
            <h5>My athletes:</h5>
            <br/>
            <AthletesTable athletes={props.athletes}/>
        </div>
    )
}
export default CoachAthletesComponent