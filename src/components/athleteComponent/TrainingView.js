import { useState } from "react"
import FeelingBox from "./FeelingBox"
import { useDataContextAthlete } from "./contexts/DataContextAthlete"

const TrainingView = (props) => {

    const dataContextAthlete = useDataContextAthlete()

    const training = dataContextAthlete.activeTraining

    const [feelingsBoxVisible, setFeelingsBoxVisible] = useState(false)
    function handleAddFeelings() {
        if(feelingsBoxVisible){
            setFeelingsBoxVisible(false)
        } else setFeelingsBoxVisible(true)
    }
    if(training && training.trainingPlanStatus) {
        const trainingText = 'Plan for ' + training.plannedDate + ' - ' + training.trainingType + ' ' 
            + training.name + ': ' + training.description + ' '
        return (
            trainingText
        )
    }
    if(training && training.timeInSeconds >= 0) {
        const trainingText = training.realizationDate + ' - ' +  training.type + ': Total training time: ' 
            + (training.timeInSeconds/60).toFixed(1) + ' minutes /' + ' Distance: '
            + (training.distanceInMeters/1000).toFixed(2) + ' km '
        const trainingFeelings = 'I feel ' + training.feelings + ' Rpe: ' + training.rpeLevel + ' Description: '
            + training.realizationDescription
        
        return (
            <div>
                <div className = "training-text">
                    {trainingText} 
                    <br/>
                    {training.feelings && trainingFeelings}
                </div>
                <button className = "btn btn-outline-dark m-1" 
                    onClick = {() => handleAddFeelings(training.id)}>Add feelings
                </button>
                {
                    feelingsBoxVisible && <FeelingBox trainingId = {training.id} 
                         refreshTrainings = {props.refreshTrainings}/>
                }
            </div>
        )
    }
}

export default TrainingView