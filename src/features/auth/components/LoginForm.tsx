// features/auth/components/LoginForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/store/hooks";


import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { loginSchema } from "@/features/auth/schema/auth.schema";
import type { LoginCredentials } from "@/types/auth";
// import { loginStart, loginSuccess, loginFailure, setToken } from '@/store/slices/auth.slice'; 
import { loginUser } from "@/services/auth.service";
import { setToken } from "@/store/slices/auth.slice";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = async (data: LoginCredentials) => {
    // dispatch(loginStart());
    try {
      const response = await loginUser(data);
      // dispatch(loginSuccess(response));
      localStorage.setItem("token", response.token);
      toast.success("Logged in successfully");
    } catch (err: any){
      toast.error(err.message || "Login failed");
      // const message = err.message || "Login failed"; 
      // dispatch(loginFailure(message));
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 420, md: 480 },
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 4, sm: 6 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to continue to Linked Posts
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              py: 1.5,
              fontWeight: 600,
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link href="/register" style={{ color: "#1976d2", fontWeight: 600 }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}