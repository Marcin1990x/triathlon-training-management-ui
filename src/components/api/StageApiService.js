import { apiClient } from "./ApiClient"

export const addNewSwimStageToTrainingPlanApi = (planId, swimStage) => apiClient.post(`training-plans/${planId}/stages=swim`, swimStage)