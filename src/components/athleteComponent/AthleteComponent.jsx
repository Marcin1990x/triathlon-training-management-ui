import { useEffect, useState } from "react"
import WeekdayList from "./WeekdayList"
import TrainingView from "./TrainingView"
import { useDataContextAthlete } from "./contexts/DataContextAthlete"
import CoachInfoComponent from "./CoachInfoComponent"

export default function AthleteComponent() {

    const dataContextAthlete = useDataContextAthlete()

    const [render, setRender] = useState(0)

    function reRender() {
        setRender(render + 1)
    }

    useEffect ( () => {
        dataContextAthlete.getTrainingPlans()
        dataContextAthlete.getTrainingRealizations()
        dataContextAthlete.getAthlete()
        }, [render])
    
    return(
        <div className="AthleteComponent">
            <div className="row">
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"><CoachInfoComponent/></div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col-md-10">
                    <h2>Athlete page</h2>
                    <WeekdayList/>
                    {dataContextAthlete.activeTraining && 
                        <div className="training-box">
                            <TrainingView refreshTrainings = {reRender}/> 
                        </div>
                    }
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}