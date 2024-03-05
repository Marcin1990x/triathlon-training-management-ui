import TrainingPlansTable from "./TrainingPlansTable"

const CoachTrainingPlansComponent = (props) => {

    return (
        <div>
            <h5>My training plans:</h5>
            <br/>
            <TrainingPlansTable plans = {props.trainingPlans}/>
        </div>
    )
}

export default CoachTrainingPlansComponent