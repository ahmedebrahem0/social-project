// services/auth.service.ts
import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import type { LoginCredentials, LoginApiResponse, RegisterApiResponse, RegisterCredentials } from "@/types/auth";

export const loginUser = async (credentials: LoginCredentials): Promise<LoginApiResponse> => {
  const response = await api.post<LoginApiResponse>(
    API_ENDPOINTS.AUTH.SIGNIN,
    credentials
  );
  return response.data;
};

// Register 
export const registerUser = async (credentials: RegisterCredentials): Promise<RegisterApiResponse> => {
  const response = await api.post<RegisterApiResponse>(
    API_ENDPOINTS.AUTH.SIGNUP,
    credentials
  );
  return response.data;
};