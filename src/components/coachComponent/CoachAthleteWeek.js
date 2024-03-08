import AthleteWeekdayList from "./AthleteWeekdayList"

const CoachAthleteWeek = ({removeTrainingPlan, plans, realizations}) => {

    return(
        <div>
            <h5>Athlete week:</h5>
            <AthleteWeekdayList removeTrainingPlan={removeTrainingPlan} plans = {plans} realizations = {realizations}/>
        </div>
    )
}

export default CoachAthleteWeek