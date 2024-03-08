
const TrainingPlansTable = ({ plans, setActivePlan}) => {

  const handlePreviewPlanBtn = (plan) => {
    setActivePlan(plan)
  }
  
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Number</th>
              <th>Sport</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => 
                  <tr key = {plan.id}>
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