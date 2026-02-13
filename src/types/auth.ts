// types/auth.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  message: string;
  token: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

