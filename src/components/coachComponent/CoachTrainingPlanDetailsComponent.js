const CoachTrainingPlanDetailsComponent = ({activePlan}) => {

    const plan = activePlan

    const Stages = () => {
        if(activePlan.stage.length > 0) {
            return (
                <div className="table-responsive" style={{ maxHeight: '270px', overflowY: 'auto' }}>
                    Stages
                    <table className="table table-striped" >
                        <thead>
                        <tr>
                            <th>Sequence</th>
                            <th>Time</th>
                            <th>Distance</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                            {activePlan.stage.map((stage) => 
                                <tr key = {stage.sequence}>
                                <td>{stage.sequence}</td>
                                <td>{stage.timeInSeconds}</td>
                                <td>{stage.distanceInMeters}</td>
                                <td>{stage.description}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    return (
        <div>
            <h5>Training plan:</h5>
            <br/>
            {activePlan && 
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Number: {plan.id}</li>
                <li className="list-group-item">Name: {plan.name}</li>
                <li className="list-group-item">Description: {plan.description}</li>
            </ul> }
            {activePlan && <Stages/>}            
        </div>
    )
}
export default CoachTrainingPlanDetailsComponent