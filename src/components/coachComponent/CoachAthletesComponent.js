import AthletesTable from "./AthletesTable"

const CoachAthletesComponent = ({athletes, onClickAthlete}) => {

    return (
        <div>
            <h5>My athletes:</h5>
            <br/>
            <AthletesTable athletes={athletes} onClickAthlete = {onClickAthlete}/>
        </div>
    )
}
export default CoachAthletesComponent