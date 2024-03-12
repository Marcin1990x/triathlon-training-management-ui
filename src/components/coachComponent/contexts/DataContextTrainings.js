import { createContext, useContext, useState } from "react";
import { getTrainingPlansByCoachIdApi } from "../../api/TrainingPlanApiService";
import { useAuth } from "../../security/AuthContext";

const DataContextTrainings = createContext()
export const useDataContextTrainings = () => useContext(DataContextTrainings)

const DataContextTrainingsProvider = ({children}) => {

    const authContext = useAuth()
    
    const [trainingPlans, setTrainingPlans] = useState([])
    
    const [newTrainingView, setNewTrainingView] = useState(false)
    const [stagesView, setStagesView] = useState(false)

    const [activePlan, setActivePlan] = useState(null)

    const getCoachTrainingPlans= () => {
        getTrainingPlansByCoachIdApi(authContext.coachId)
            .then(response => {
                console.log(response)
                setTrainingPlans(response.data)
            })
            .catch(error => console.log(error))
    }
    function activatePlan(plan) {
        setActivePlan(plan)
    }
    const switchView = () => {
        setNewTrainingView(!newTrainingView)
    }
    const switchStageView = () => {
        setStagesView(!stagesView)
    }

    return (
        <DataContextTrainings.Provider value = {{getCoachTrainingPlans, trainingPlans, activatePlan, activePlan, 
            newTrainingView, setNewTrainingView, switchView, switchStageView, stagesView}}>
            {children}
        </DataContextTrainings.Provider>
    )
}
export default DataContextTrainingsProvider