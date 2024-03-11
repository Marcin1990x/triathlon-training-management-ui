import { useEffect, useState } from "react"
import CoachAthletesComponent from "./CoachAthletesComponent"
import CoachTrainingPlansComponent from "./CoachTrainingPlansComponent"
import CoachTrainingPlanDetailsComponent from "./CoachTrainingPlanDetailsComponent"
import CoachAthleteWeek from "./CoachAthleteWeek"
import NewTrainingPlanComponent from "./NewTrainingPlanComponent"
import { Toaster } from "react-hot-toast"
import { useDataContextAthletes } from "./contexts/DataContextAthletes"
import { useDataContextTrainings } from "./contexts/DataContextTrainings"

export default function CoachComponent() {

    const dataContextAthletes = useDataContextAthletes()
    const dataContextTrainings = useDataContextTrainings()

    const buttonText = () => {
        return dataContextAthletes.athleteView ? 'See trainings' : 'See athletes';
    }

    useEffect( () => {
        dataContextAthletes.getAthletes()
        dataContextTrainings.getCoachTrainingPlans()
    }, [])

    const handleSwitchViewBtn = () => {
        dataContextAthletes.toggleView()
        dataContextTrainings.setNewTrainingView(false)
    }
    return (
        <div className = "CoachComponent">

            <Toaster toastOptions={{duration: 4000}}/>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>Coach page</h2> 
                        {!dataContextAthletes.addPlanMode && 
                            <button className = "btn btn-primary float-end m-2" onClick = {handleSwitchViewBtn}>{buttonText()}</button> 
                        }
                        {dataContextAthletes.addPlanMode &&
                            <button className = "btn btn-warning m-2" 
                                onClick = {() => dataContextAthletes.handleAddPlanMode(false)}>Cancel adding plan
                            </button>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {dataContextAthletes.athleteView && <CoachAthletesComponent/>}
                        {!dataContextAthletes.athleteView && !dataContextTrainings.newTrainingView && <CoachTrainingPlansComponent/> }
                        {dataContextTrainings.newTrainingView && <NewTrainingPlanComponent/> }
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {dataContextAthletes.athleteView && <CoachAthleteWeek/>}
                        {!dataContextAthletes.athleteView && !dataContextTrainings.newTrainingView && <CoachTrainingPlanDetailsComponent/> }
                    </div>
                </div>
            </div>
        </div>
    )
}