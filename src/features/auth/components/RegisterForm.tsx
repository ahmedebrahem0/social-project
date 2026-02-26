// features/auth/components/RegisterForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { register as registerUser } from "@/store/slices/auth.slice"; // ← الـ thunk

import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Paper,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { RegisterSchema } from "@/features/auth/schema/auth.schema";
import type { RegisterFormValues } from "@/features/auth/schema/auth.schema";
import { format } from "date-fns";

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(RegisterSchema),
    mode: "onSubmit",
  });

const { isAuthenticated } = useAppSelector((state) => state.auth);
  // check user Auth
  useEffect(() => {
  if (isAuthenticated) {
    router.replace("/");
  }
}, [isAuthenticated, router]);
  
const onSubmit = async (values: RegisterFormValues) => {
    const payload = {
      ...values,
      dateOfBirth: values.dateOfBirth 
        ? format(values.dateOfBirth, "d-M-yyyy") 
        : "",
    };

    const result = await dispatch(registerUser(payload as any));
    
    if (registerUser.fulfilled.match(result)) {
      router.push("/login");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="section"
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 420, md: 480 },
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 4, sm: 6 },
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: { xs: 2, sm: 3 },
            bgcolor: "background.paper",
          }}
        >
          {/* Header */}
          <Box sx={{ mb: { xs: 3, sm: 4 } }}>
            <Typography
              variant="h5"
              component="h1"
              fontWeight={600}
              gutterBottom
              sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
            >
              Create your account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join Linked Posts and start connecting.
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: { xs: 2.5, sm: 3 } }}
          >
            {/* Name */}
            <TextField
              label="Name"
              placeholder="Ahmed Bahnasy"
              fullWidth
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name")}
            />

            {/* Email */}
            <TextField
              label="Email"
              type="email"
              placeholder="bahnasy2040101@gmail.com"
              fullWidth
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />

            {/* Password */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
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

            {/* Confirm Password */}
            <TextField
              label="Confirm Password"
              type={showRePassword ? "text" : "password"}
              placeholder="••••••••"
              fullWidth
              variant="outlined"
              error={!!errors.rePassword}
              helperText={errors.rePassword?.message}
              {...register("rePassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowRePassword(!showRePassword)} edge="end">
                      {showRePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Date of Birth */}
            <DatePicker
  label="Date of Birth"
  value={watch("dateOfBirth") || null}  // أو watch("dateOfBirth") ?? null
onChange={(newValue) => setValue("dateOfBirth", newValue)}
  format="dd-MM-yyyy"
  disableFuture
  slotProps={{
    textField: {
      fullWidth: true,
      variant: "outlined",
      error: !!errors.dateOfBirth,
      helperText: errors.dateOfBirth?.message,
    },
  }}
/>

            {/* Gender */}
            {/* Gender */}
<FormControl error={!!errors.gender} sx={{ mt: 1 }}>
  <FormLabel id="gender-label">Gender</FormLabel>
  <RadioGroup
  row
  aria-labelledby="gender-label"
  value={watch("gender") ?? ""}   // ← ?? "" → nullish coalescing (يفضل)
  onChange={(e) => setValue("gender", e.target.value as "male" | "female")}
>
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="female" control={<Radio />} label="Female" />
  </RadioGroup>
  {errors.gender && (
    <FormHelperText>{errors.gender.message}</FormHelperText>
  )}
</FormControl>

            {/* Terms Checkbox
            <FormControlLabel
              control={<Checkbox size="small" {...register("agreeToTerms")} />}
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <Link href="/terms" style={{ color: "inherit", textDecoration: "underline" }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" style={{ color: "inherit", textDecoration: "underline" }}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ alignItems: "flex-start", mt: -1 }}
            />
            {errors.agreeToTerms && (
              <Typography variant="caption" color="error" sx={{ mt: -1.5, ml: 4 }}>
                {errors.agreeToTerms.message}
              </Typography>
            )} */}

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                py: { xs: 1.2, sm: 1.4 },
                textTransform: "none",
                fontWeight: 500,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                bgcolor: "grey.900",
                "&:hover": { bgcolor: "grey.800" },
              }}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            {/* Already have account */}
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link
                href="/login"
                style={{ fontWeight: 500, color: "inherit", textDecoration: "underline" }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>

        {/* Small note */}
        <Typography
          variant="caption"
          color="text.disabled"
          align="center"
          display="block"
          sx={{ mt: { xs: 4, sm: 3 } }}
        >
          We’ll never share your information without your permission.
        </Typography>
      </Box>
    </LocalizationProvider>
  );
}