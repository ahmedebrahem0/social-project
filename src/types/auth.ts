// types/auth.ts

//types for login
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  message: string;
  token: string;
}
//types for  Rgister
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: Date | null; 
  gender: "male" | "female"; // أضف union type للـ gender
}

export interface RegisterApiResponse {
  message: string;
}


// types for change password
export interface ChangePasswordCredentials {
  password: string;        // Old password
  newPassword: string;     // New password
}

// ✅ عدل الـ Response - فيه token
export interface ChangePasswordApiResponse {
  message: string;
  token: string;  // ✅ أضف الـ token
}


//types for auth state
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}


// 
export interface User {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: "male" | "female";
  profilePhoto?: string;
}