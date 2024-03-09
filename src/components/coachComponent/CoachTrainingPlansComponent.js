import TrainingPlansTable from "./TrainingPlansTable"

const CoachTrainingPlansComponent = ({trainingPlans, setActivePlan, addPlanMode, addPlanToAthlete}) => {

    return (
        <div>
            <h5>My training plans:</h5>
            <br/>
            <TrainingPlansTable plans = {trainingPlans} setActivePlan = {setActivePlan} addPlanMode = {addPlanMode}
                addPlanToAthlete = {addPlanToAthlete}/>
        </div>
    )
}

export default CoachTrainingPlansComponent