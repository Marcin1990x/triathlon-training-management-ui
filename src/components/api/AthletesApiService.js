import { apiClient } from "./ApiClient"

export const getAthletesByCoachIdApi = (id) => apiClient.get(`coaches/${id}/athletes`)