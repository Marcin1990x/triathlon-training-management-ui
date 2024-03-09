
const TrainingPlansTable = ({ plans, setActivePlan, addPlanMode, addPlanToAthlete}) => {

  const handlePreviewPlanBtn = (plan) => {
    setActivePlan(plan)
  }

  const handleAddPlanToAthleteBtn = (id) => {
    addPlanToAthlete(id)
  }
  
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              {addPlanMode &&
                <th>Choose plan to add</th>
              }
              <th>Number</th>
              <th>Sport</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => 
                  <tr key = {plan.id}>
                    {addPlanMode &&
                      <td>
                        <button className = "btn btn-success" onClick = {() => handleAddPlanToAthleteBtn(plan.id)}>Add</button>
                      </td>
                    }
                    <td>{plan.id}</td>
                    <td>{plan.trainingType}</td>
                    <td>{plan.name}</td>
                    <td>{plan.description}</td>
                    <td><button className="btn btn-outline-primary" onClick = {() => handlePreviewPlanBtn(plan)}>+</button></td>
                  </tr>
            )}
          </tbody>
        </table>
      </div>  
    )
}
export default TrainingPlansTable