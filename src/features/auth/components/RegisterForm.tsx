"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: Date | null;
  gender: "male" | "female" | "";
  agreeToTerms: boolean;
};

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: null,
      gender: "",
      agreeToTerms: false,
    },
    mode: "onSubmit",
  });

  const password = watch("password");

  const onSubmit = async (values: RegisterFormValues) => {
    const formattedData = {
      ...values,
      dateOfBirth: values.dateOfBirth ? format(values.dateOfBirth, "d-M-yyyy") : "",
    };
    console.log("Register values:", formattedData);
    // هنا في المستقبل: ربط بالـ API / backend
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
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name is too short" },
              })}
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
            />

            {/* Password */}
            <TextField
              label="Password"
              type="password"
              placeholder="••••••••"
              fullWidth
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />

            {/* Confirm Password */}
            <TextField
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              fullWidth
              variant="outlined"
              error={!!errors.rePassword}
              helperText={errors.rePassword?.message}
              {...register("rePassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />

            {/* Date of Birth */}
            <DatePicker
              label="Date of Birth"
              value={watch("dateOfBirth")}
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
            {errors.dateOfBirth && (
              <Typography variant="caption" color="error" sx={{ mt: -1.5, ml: 1.5 }}>
                {errors.dateOfBirth.message}
              </Typography>
            )}

            {/* Gender */}
            <FormControl error={!!errors.gender} sx={{ mt: 1 }}>
              <FormLabel id="gender-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="gender-label"
                value={watch("gender")}
                onChange={(e) => setValue("gender", e.target.value as "male" | "female")}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
              {errors.gender && (
                <FormHelperText>{errors.gender.message}</FormHelperText>
              )}
            </FormControl>

            {/* Terms Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  {...register("agreeToTerms", {
                    required: "You must agree to the terms",
                  })}
                />
              }
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
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                py: { xs: 1.2, sm: 1.4 },
                textTransform: "none",
                fontWeight: 500,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                bgcolor: "grey.900",
                "&:hover": { bgcolor: "grey.800" },
                "&.Mui-disabled": { bgcolor: "grey.400" },
              }}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
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