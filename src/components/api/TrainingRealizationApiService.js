import { apiClient } from "./ApiClient"

export const getTrainingRealizationsByAthleteIdApi = (id) => apiClient.get(`athletes/${id}/training-realizations`)

export const synchronizeActivitiesForAthleteApi = (id) => apiClient.put(`athletes/${id}/training-realizations`)

export const updateTrainingRealizationByIdApi = (id, updateRequest) => apiClient.put(`training-realizations/${id}`, updateRequest)