import { apiClient } from "./ApiClient"

export const getTrainingRealizationsByAthleteId = (id) => apiClient.get(`athletes/${id}/training-realizations`)