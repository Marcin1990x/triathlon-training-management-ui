import { apiClient } from "./ApiClient"

export const addNewCoachApi = (coach) => apiClient.post(`coaches`, coach)