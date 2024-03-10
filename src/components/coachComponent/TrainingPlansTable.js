import { useState } from "react"
import { useDataContext } from "./contexts/DataContext"

const TrainingPlansTable = ({ plans, setActivePlan}) => {

  const dataContext = useDataContext()

  const [highlightedRow, setHighlightedRow] = useState(null)

    const handleRowClick = (index) => {
      setHighlightedRow(index)
    }

  const handlePreviewPlanBtn = (plan) => {
    setActivePlan(plan)
  }

  const handleAddPlanToAthleteBtn = (id) => {
    dataContext.addTrainingPlanToAthleteWithDate(id)
  }
  
    return (
      <div>
        <table className="table">
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
            {plans.map((plan, index) => 
                  <tr key = {plan.id} className = {highlightedRow == index ? "table-warning" : ""}>
                    {dataContext.addPlanMode &&
                      <td>
                        <button className = "btn btn-success" onClick = {() => handleAddPlanToAthleteBtn(plan.id)}>Add</button>
                      </td>
                    }
                    <td>{plan.id}</td>
                    <td>{plan.trainingType}</td>
                    <td>{plan.name}</td>
                    <td>{plan.description}</td>
                    <td><button className="btn btn-outline-primary" onClick = {() => { handlePreviewPlanBtn(plan);
                      handleRowClick(index)}}>+</button></td>
                  </tr>
            )}
          </tbody>
        </table>
      </div>  
    )
}
export default TrainingPlansTable