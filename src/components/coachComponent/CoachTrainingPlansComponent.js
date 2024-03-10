import TrainingPlansTable from "./TrainingPlansTable"

const CoachTrainingPlansComponent = ({trainingPlans, setActivePlan}) => {

    return (
        <div>
            <h5>My training plans:</h5>
            <br/>
            <TrainingPlansTable plans = {trainingPlans} setActivePlan = {setActivePlan}/>
        </div>
    )
}

export default CoachTrainingPlansComponent