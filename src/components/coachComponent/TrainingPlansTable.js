import { useDataContext } from "./contexts/DataContext"

const TrainingPlansTable = ({ plans, setActivePlan}) => {

  const dataContext = useDataContext()

  const handlePreviewPlanBtn = (plan) => {
    setActivePlan(plan)
  }

  const handleAddPlanToAthleteBtn = (id) => {
    dataContext.addTrainingPlanToAthleteWithDate(id)
  }
  
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              {dataContext.addPlanMode &&
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
                    {dataContext.addPlanMode &&
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