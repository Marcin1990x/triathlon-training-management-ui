import AthletesTable from "./AthletesTable"
import CoachAthleteWeek from "./CoachAthleteWeek"

const CoachAthletesComponent = () => {

    return (
        <div>
            <h5>My athletes:</h5>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <AthletesTable/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <CoachAthleteWeek/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CoachAthletesComponent