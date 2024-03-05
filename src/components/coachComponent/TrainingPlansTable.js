const TrainingPlansTable = ({ plans }) => {

  function handlePlanStages(stages) {



    if(stages.length > 0)
    return (
      <button className="btn btn-outline-primary">+</button>
    )
  }
    
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sport</th>
            <th>Name</th>
            <th>Description</th>
            <th>Stages</th>
          </tr>
        </thead>
        <tbody>
          {
            plans.map((plan) => 
              <tr key = {plan.id}>
                <td>{plan.id}</td>
                <td>{plan.trainingType}</td>
                <td>{plan.name}</td>
                <td>{plan.description}</td>
                <td>{handlePlanStages(plan.stage)}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    )
}

export default TrainingPlansTable