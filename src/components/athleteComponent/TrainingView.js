import { useState } from "react"
import FeelingBox from "./FeelingBox"

const TrainingView = (props) => {

    const [feelingsBoxVisible, setFeelingsBoxVisible] = useState(false)
    function handleAddFeelings(id) {
        if(feelingsBoxVisible){
            setFeelingsBoxVisible(false)
        } else setFeelingsBoxVisible(true)
    }

    if(props.training && props.training.trainingPlanStatus) {
        const trainingText = 'Plan for ' + props.training.plannedDate + ' - ' +  props.training.trainingType + ' ' 
            + props.training.name + ': ' + props.training.description + ' '
        return (
            trainingText
        )
    }
    if(props.training && props.training.rpeLevel) {
        const trainingText = props.training.realizationDate + ' - ' +  props.training.type + ': Total training time: ' 
            + (props.training.timeInSeconds/60).toFixed(1) + ' minutes /' + ' Distance: '
            + (props.training.distanceInMeters/1000).toFixed(2) + ' km. '
        return (
            <div>
                {trainingText}
                <button className = "btn btn-outline-dark m-1" 
                    onClick = {() => handleAddFeelings(props.training.id)}>Add feelings
                </button>
                {feelingsBoxVisible && <FeelingBox trainingId = {props.training.id} render = {props.render}/>}
            </div>
        )
    }
}

export default TrainingView