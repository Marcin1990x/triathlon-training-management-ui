import AthleteWeekdayList from "./AthleteWeekdayList"

const CoachAthleteWeek = ({plans, realizations}) => {

    return(
        <div>
            <h5>Athlete week:</h5>
            <AthleteWeekdayList plans = {plans} realizations = {realizations}/>
        </div>
    )
}

export default CoachAthleteWeek