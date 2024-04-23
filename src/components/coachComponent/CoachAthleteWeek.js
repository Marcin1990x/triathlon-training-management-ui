import { useState } from "react"
import { removeAthleteFromCoach } from "../api/CoachApiService"
import { useAuth } from "../security/AuthContext"
import AthleteWeekdayList from "./AthleteWeekdayList"
import TrainingRealizationDetails from "./TrainingRealizationDetails"
import { useDataContextAthletes } from "./contexts/DataContextAthletes"
import { useWeekdayListVisibility } from "./contexts/WeekdayListVisibilityContext"
import { toast } from "react-hot-toast"

const CoachAthleteWeek = () => {

    const {athleteId, getAthletes} = useDataContextAthletes()
    const {coachId} = useAuth()
    const {isListVisible, setVisibility} = useWeekdayListVisibility()
    const [removeConfirmation, setRemoveConfirmation] = useState()

    const successToast = (message) => toast.success(message)

    const handleRemoveAthleteBtn = () => {
        setRemoveConfirmation(true)
    }
    const handleYesBtn = () => {
        removeAthlete()
        setRemoveConfirmation(false)
    }
    const handleNoBtn = () => {
        setRemoveConfirmation(false)
    }
    const removeAthlete = () => {

        removeAthleteFromCoach(coachId, athleteId)
        .then(response => {
            console.log(response)
            getAthletes()
            setVisibility(false)
            successToast('Athlete removed successfully.')
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
                        <TrainingRealizationDetails/>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            {!removeConfirmation &&
                                <button className="btn btn-outline-danger m-2" onClick={() => handleRemoveAthleteBtn()}>Remove athlete</button>
                            }
                            {removeConfirmation &&
                                <div>
                                    <p>Are you sure you want to delete athlete?</p>
                                    <button className="btn btn-outline-danger m-2" onClick={() => handleYesBtn()}>Yes</button>
                                    <button className="btn btn-outline-danger m-2" onClick={() => handleNoBtn()}>No</button>
                                </div>
                            }
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CoachAthleteWeek