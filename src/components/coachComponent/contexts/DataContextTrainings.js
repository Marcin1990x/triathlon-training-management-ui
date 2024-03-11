import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { getTrainingPlansByCoachIdApi } from "../../api/TrainingPlanApiService";
import { useAuth } from "../../security/AuthContext";

const DataContextTrainings = createContext()
export const useDataContextTrainings = () => useContext(DataContextTrainings)

const DataContextTrainingsProvider = ({children}) => {
    
    const successToast = (message) => toast.success(message)
    const authContext = useAuth()
    
    const [trainingPlans, setTrainingPlans] = useState([])
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

    return (
        <DataContextTrainings.Provider value = {{getCoachTrainingPlans, trainingPlans, activatePlan, activePlan}}>
            {children}
        </DataContextTrainings.Provider>
    )
}
export default DataContextTrainingsProvider