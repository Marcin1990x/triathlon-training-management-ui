import { apiClient } from "./ApiClient";


export const refreshAccessTokenForUserApi = (id) => apiClient.post(`users/${id}/refreshAccessToken`)