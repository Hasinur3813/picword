import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@/lib/api/authApi";
import {
  setAuthCookies,
  removeAuthCookies,
  getClientToken,
  getClientUser,
} from "@/lib/cookies";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  IUser,
} from "@/types/auth";

/**
 * Async Thunk: Login
 */
export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const data = await authApi.login(credentials);
    setAuthCookies(data.token, data.user, credentials.rememberMe ?? true);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to log in. Please check your credentials.");
  }
});

/**
 * Async Thunk: Register
 */
export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const data = await authApi.register(credentials);
    setAuthCookies(data.token, data.user, true);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Registration failed. Please try again.");
  }
});

/**
 * Async Thunk: Forgot Password
 */
export const forgotPassword = createAsyncThunk<
  { success: boolean; message: string },
  ForgotPasswordPayload,
  { rejectValue: string }
>("auth/forgotPassword", async (payload, { rejectWithValue }) => {
  try {
    const data = await authApi.forgotPassword(payload);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to process forgot password request.");
  }
});

/**
 * Async Thunk: Reset Password
 */
export const resetPassword = createAsyncThunk<
  { success: boolean; message: string },
  ResetPasswordPayload,
  { rejectValue: string }
>("auth/resetPassword", async (payload, { rejectWithValue }) => {
  try {
    const data = await authApi.resetPassword(payload);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to reset password.");
  }
});

/**
 * Async Thunk: Load Current User from Storage or /auth/me
 */
export const loadCurrentUser = createAsyncThunk<
  { user: IUser; token: string } | null,
  void,
  { rejectValue: string }
>("auth/loadCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const token = getClientToken();
    const cachedUser = getClientUser();

    if (!token || !cachedUser) {
      return null;
    }

    try {
      // Attempt live fetch if backend is available
      const response = await authApi.getMe();
      if (response?.data) {
        setAuthCookies(token, response.data);
        return { user: response.data, token };
      }
    } catch {
      // Gracefully retain cached user if offline or server not ready
    }

    return { user: cachedUser, token };
  } catch (error: any) {
    removeAuthCookies();
    return rejectWithValue(error.message || "Session expired");
  }
});
