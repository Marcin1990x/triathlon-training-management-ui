import { apiClient } from "./ApiClient";


export const refreshAccessTokenForUserApi = (id) => apiClient.post(`users/${id}/refreshAccessToken`)

export const addCoachToUserApi = (userId, coachId) => apiClient.put(`users/${userId}/coaches/${coachId}/add`)

export const addAthleteToUserApi = (userId, athleteId) => apiClient.put(`users/${userId}/athletes/${athleteId}/add`)