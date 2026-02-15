// store/slices/auth.slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, changePassword as changePasswordService } from "@/services/auth.service";
import type { AuthState, LoginCredentials, LoginApiResponse, RegisterCredentials, RegisterApiResponse } from "@/types/auth";
import toast from "react-hot-toast";
import { ChangePasswordApiResponse, ChangePasswordCredentials } from '../../types/auth';

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Login thunk
 */
export const login = createAsyncThunk<
  LoginApiResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    return await loginUser(credentials);
  } catch (err: any) {
    return rejectWithValue(err.message || "Login failed. Please check your credentials.");
  }
});

/**
 * Register thunk
 */
export const register = createAsyncThunk<
  RegisterApiResponse,
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    return await registerUser(credentials);
  } catch (err: any) {
    return rejectWithValue(err.message || "Registration failed.");
  }
});

/**
 * Change Password thunk
 */
export const changePassword = createAsyncThunk<
  ChangePasswordApiResponse,
  ChangePasswordCredentials,
  { rejectValue: string }
>("auth/changePassword", async (credentials, { rejectWithValue }) => {
  try {
    return await changePasswordService(credentials);
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to change password.");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      toast.success("Logged out successfully");
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // ─── Login Cases ────────────────────────────────────────────────────
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        toast.loading("Signing in...", { id: "auth-toast" });
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginApiResponse>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.error = null;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }

        toast.success("Logged in successfully!", { id: "auth-toast" });
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.log(state.error)
        toast.error(state.error || "Login failed", { id: "auth-toast" });
      });

    // ─── Register Cases ─────────────────────────────────────────────────
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        toast.loading("Creating account...", { id: "auth-toast" });
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        toast.success("Account created successfully! Please log in.", { id: "auth-toast" });
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Registration failed", { id: "auth-toast" });
      });
    // ─── Change Password Cases ──────────────────────────────────────────
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        toast.loading("Changing password...", { id: "auth-toast" });
      })
      .addCase(changePassword.fulfilled, (state, action: PayloadAction<ChangePasswordApiResponse>) => {
        state.isLoading = false;
        state.error = null;
        
        state.token = action.payload.token;
        
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
        
        toast.success("Password changed successfully!", { id: "auth-toast" });
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Failed to change password", { id: "auth-toast" });
      });

  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;