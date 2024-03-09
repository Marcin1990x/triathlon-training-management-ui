import AthleteWeekdayList from "./AthleteWeekdayList"

const CoachAthleteWeek = ({removeTrainingPlan, plans, realizations, addPlanModeAndSetDay}) => {

    return(
        <div>
            <h5>Athlete week:</h5>
            <AthleteWeekdayList removeTrainingPlan={removeTrainingPlan} plans = {plans} 
                realizations = {realizations} addPlanModeAndSetDay = {addPlanModeAndSetDay}/>
        </div>
    )
}

export default CoachAthleteWeek