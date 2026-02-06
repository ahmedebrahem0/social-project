// services/auth.service.ts
import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import type { LoginCredentials, LoginApiResponse } from "@/types/auth";

export const loginUser = async (credentials: LoginCredentials): Promise<LoginApiResponse> => {
  const response = await api.post<LoginApiResponse>(
    API_ENDPOINTS.AUTH.SIGNIN,
    credentials
  );
  return response.data;
};


