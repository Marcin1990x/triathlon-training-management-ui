import { apiClient } from "./ApiClient"

export const getTrainingPlansByAthleteIdApi = (id) => apiClient.get(`athletes/${id}/training-plans`)

export const getTrainingPlansByCoachIdApi = (id) => apiClient.get(`coaches/${id}/training-plans`)

export const removeTrainingPlanFromAthleteApi = (athleteId, trainingPlanId) => 
    apiClient.put(`athletes/${athleteId}/training-plans/${trainingPlanId}`)