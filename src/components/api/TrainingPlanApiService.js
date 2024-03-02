import { apiClient } from "./ApiClient"

export const getTrainingPlansByAthleteId = (id) => apiClient.get(`athletes/${id}/training-plans`)