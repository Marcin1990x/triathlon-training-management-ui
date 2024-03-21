import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../security/AuthContext";
import { getTrainingPlansByAthleteIdApi } from "../../api/TrainingPlanApiService";
import { getTrainingRealizationsByAthleteIdApi } from "../../api/TrainingRealizationApiService";

const DataContextAthlete = createContext()
export const useDataContextAthlete = () => useContext(DataContextAthlete)

const DataContextAthleteProvider = ({children}) => {

    const [trainingPlans, setTrainingPlans] = useState([])
    const [trainingRealizations, setTrainingRealizations] = useState([])
    const [activeTraining, setActiveTraining] = useState(null)

    const authContext = useAuth()
    
    const successToast = (message) => toast.success(message)

    const getTrainingPlans = () => {
        getTrainingPlansByAthleteIdApi(authContext.athleteId)
            .then(response => {
                console.log(response)
                setTrainingPlans(response.data)
            })
            .catch(error => console.log(error))
    }
    const getTrainingRealizations = () => {
        getTrainingRealizationsByAthleteIdApi(authContext.athleteId)
            .then(response => {
                console.log(response)
                setTrainingRealizations(response.data)
            })
            .catch(error => console.log(error))
    }

    const setActiveTrainingFunction = (training) => {
        setActiveTraining(training)
    }

    return (
        <DataContextAthlete.Provider value = {{getTrainingPlans, getTrainingRealizations, trainingPlans, trainingRealizations,
            setActiveTrainingFunction, activeTraining}}>
            {children}
        </DataContextAthlete.Provider>
    )
}
export default DataContextAthleteProvider