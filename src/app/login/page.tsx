"use client";
import { loginFormDto, loginPayload } from "@/utilities/models";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./login.module.scss";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  CustomVisibilityIcon,
  CustomVisibilityOffIcon,
  StyledTextField,
} from "../../assets/theme/common";
import { loginImage } from "../../assets/images/index";
import CustomButton from "@/components/shared/CustomButton";
import { validateFormData } from "@/utilities/helpers";
import { jokeService } from "@/services/joke.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { SelectedAuthState, useAuthStore } from "@/zustandStore/useAuthStore";
import { useRouter } from "next/navigation";

const Login = () => {
  const INITIAL_RESET_FORM_DATA: loginFormDto = {
    email: {
      value: "",
      isRequired: true,
      disable: false,
      readonly: false,
      validator: "email",
      error: "",
    },
    password: {
      value: "",
      isRequired: true,
      disable: false,
      readonly: false,
      validator: "text",
      error: "",
      min: 6,
    },
  };
  const [loginFormData, setLoginFormData] = useState<loginFormDto>(
    INITIAL_RESET_FORM_DATA,
  );
  const login = useAuthStore((state: SelectedAuthState) => state.login);
  const [helperText, setHelperText] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate, isPending, isError, error, data } = useMutation<
    AxiosResponse<any>,
    Error,
    loginPayload
  >({
    mutationFn: jokeService.Login,
    onSuccess: (response) => {
      toast.success("Login successful");
      login();
      localStorage.setItem("accessToken", response.data.data.token);
      router.push("/moderator-dashboard");
    },
    onError: (error) => {
      toast.error("Login failed");
    },
  });

  const onInputHandleChange = (property: string, value: string) => {
    setLoginFormData({
      ...loginFormData,
      [property]: {
        ...loginFormData[property as keyof typeof loginFormData],
        value: value,
        error: null,
      },
    });
  };
  const handleInputFocus = (property: string) => {
    setLoginFormData({
      ...loginFormData,
      [property]: {
        ...loginFormData[property as keyof typeof loginFormData],
        error: null,
      },
    });
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setHelperText(true);
    const [validateData, isValid] = await validateFormData(loginFormData);
    setLoginFormData(validateData);
    if (isValid) {
      const payload: loginPayload = {
        email: loginFormData.email.value,
        password: loginFormData.password.value,
      };
      mutate(payload);
    }
  };

  return (
    <div className={styles.container}>
      <Grid container>
        <Grid item xs={12} md={6} className={styles.loginSection}>
          <Box className={styles.loginBox}>
            <Typography className={styles.subtitle}>Welcome Back!</Typography>

            <StyledTextField
              label="Enter Email"
              variant="outlined"
              fullWidth
              margin="dense"
              placeholder="Enter Email"
              size="small"
              value={loginFormData.email.value}
              error={!!loginFormData.email.error}
              disabled={loginFormData.email.disable}
              required={loginFormData.email.isRequired}
              helperText={helperText && loginFormData.email.error}
              onFocus={() => handleInputFocus("email")}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onInputHandleChange("email", event.target.value)
              }
            />
            <StyledTextField
              label="Enter  Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="dense"
              fullWidth
              placeholder="Enter Password"
              size="small"
              value={loginFormData.password.value}
              error={!!loginFormData.password.error}
              disabled={loginFormData.password.disable}
              required={loginFormData.password.isRequired}
              helperText={helperText && loginFormData.password.error}
              onFocus={() => handleInputFocus("password")}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onInputHandleChange("password", event.target.value)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ color: "#437EF7" }}
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? (
                        <CustomVisibilityOffIcon />
                      ) : (
                        <CustomVisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <CustomButton
            text="Login"
            color="#ffff"
            variant="contained"
            backgroundColor="#29039E"
            textTransform="uppercase"
            size="large"
            isLoading={false}
            onClick={() => {
              handleLogin();
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} className={styles.imageSection}>
          <Image
            src={loginImage}
            alt="Description of image"
            width={500}
            height={300}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
