import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  loadCurrentUser,
} from "./authThunks";
import { removeAuthCookies } from "@/lib/cookies";
import type { AuthState, IUser } from "@/types/auth";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isHydrated: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      removeAuthCookies();
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    setSession: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isHydrated = true;
      state.error = null;
    },
    setHydrated: (state) => {
      state.isHydrated = true;
    },
  },
  extraReducers: (builder) => {
    // ── Login ─────────────────────────────────────────────
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isHydrated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Login failed";
      });

    // ── Register ──────────────────────────────────────────
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isHydrated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Registration failed";
      });

    // ── Forgot Password ───────────────────────────────────
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to process request";
      });

    // ── Reset Password ────────────────────────────────────
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to reset password";
      });

    // ── Load Current User (Session Hydration) ─────────────
    builder
      .addCase(loadCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isHydrated = true;
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        } else {
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
        }
      })
      .addCase(loadCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isHydrated = true;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout, clearAuthError, setSession, setHydrated } =
  authSlice.actions;

export default authSlice.reducer;
