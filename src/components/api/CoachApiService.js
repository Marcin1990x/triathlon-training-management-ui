import { apiClient } from "./ApiClient"

export const addNewCoachApi = (coach) => apiClient.post(`coaches`, coach)

export const addAthleteToCoach = (coachId, athleteId) => apiClient.put(`coaches/${coachId}/athletes/${athleteId}/add`)