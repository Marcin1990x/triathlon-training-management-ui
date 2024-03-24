import { removeAthleteFromCoach } from "../api/CoachApiService"
import { useAuth } from "../security/AuthContext"
import AthleteWeekdayList from "./AthleteWeekdayList"
import { useDataContextAthletes } from "./contexts/DataContextAthletes"
import { useWeekdayListVisibility } from "./contexts/WeekdayListVisibilityContext"
import { toast } from "react-hot-toast"

const CoachAthleteWeek = () => {

    const {athleteId, getAthletes} = useDataContextAthletes()
    const {coachId} = useAuth()
    const {isListVisible, setVisibility} = useWeekdayListVisibility()

    const successToast = (message) => toast.success(message)

    const handleRemoveAthleteBtn = () => {
        console.log(athleteId)

        removeAthleteFromCoach(coachId, athleteId)
            .then(response => {
                console.log(response)
                getAthletes()
                setVisibility(false)
                successToast('Athlete removed successfully.') // name ?
            })
            .catch(error => console.log(error))
    }
    return(
        
        <div className="coachAthleteWeek">
            {isListVisible &&
                <div className="container">
                    <div className="row">
                        <AthleteWeekdayList/>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <button className="btn btn-outline-danger m-3" onClick={() => handleRemoveAthleteBtn()}>Remove athlete</button>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            }
        </div>
        
    )
}

export default CoachAthleteWeek