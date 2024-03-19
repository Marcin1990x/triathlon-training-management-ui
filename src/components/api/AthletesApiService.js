import { apiClient } from "./ApiClient"

export const getAthletesByCoachIdApi = (id) => apiClient.get(`coaches/${id}/athletes`)

export const addNewAthleteApi = (athlete) => apiClient.post(`athletes`, athlete)