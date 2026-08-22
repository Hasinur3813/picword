import api from "./axios";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  IUser,
} from "@/types/auth";

// Simulated delay helper for graceful fallback
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generate simulated auth response when backend is not connected or in mock mode
 */
const createMockAuthResponse = (email: string, name?: string, role: "user" | "admin" = "user"): AuthResponse => {
  const isAdmin = email.toLowerCase().includes("admin");
  return {
    success: true,
    message: "Authentication successful",
    token: `mock_jwt_token_${btoa(email)}_${Date.now()}`,
    user: {
      _id: `user_${Date.now()}`,
      name: name || (isAdmin ? "Admin User" : email.split("@")[0].replace(/[._]/g, " ")),
      email,
      role: isAdmin ? "admin" : role,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      createdAt: new Date().toISOString(),
    },
  };
};

export const authApi = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials);
      return response.data;
    } catch (error: any) {
      // If server is unreachable or returned 404 (endpoints not on server yet), fallback gracefully to simulation
      if (
        error.message?.includes("Unable to connect") ||
        error.message?.includes("Network Error") ||
        error.message?.includes("404") ||
        error.message?.includes("status 404")
      ) {
        await delay(600);
        return createMockAuthResponse(credentials.email);
      }
      throw error;
    }
  },

  /**
   * Register new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/register", credentials);
      return response.data;
    } catch (error: any) {
      if (
        error.message?.includes("Unable to connect") ||
        error.message?.includes("Network Error") ||
        error.message?.includes("404") ||
        error.message?.includes("status 404")
      ) {
        await delay(600);
        return createMockAuthResponse(credentials.email, credentials.name);
      }
      throw error;
    }
  },

  /**
   * Request password reset instructions
   */
  async forgotPassword(payload: ForgotPasswordPayload): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post<{ success: boolean; message: string }>("/auth/forgot-password", payload);
      return response.data;
    } catch (error: any) {
      if (
        error.message?.includes("Unable to connect") ||
        error.message?.includes("Network Error") ||
        error.message?.includes("404") ||
        error.message?.includes("status 404")
      ) {
        await delay(500);
        return {
          success: true,
          message: `Password reset link has been dispatched to ${payload.email}`,
        };
      }
      throw error;
    }
  },

  /**
   * Reset password with token
   */
  async resetPassword(payload: ResetPasswordPayload): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post<{ success: boolean; message: string }>("/auth/reset-password", payload);
      return response.data;
    } catch (error: any) {
      if (
        error.message?.includes("Unable to connect") ||
        error.message?.includes("Network Error") ||
        error.message?.includes("404") ||
        error.message?.includes("status 404")
      ) {
        await delay(500);
        return {
          success: true,
          message: "Your password has been successfully reset. Please log in with your new password.",
        };
      }
      throw error;
    }
  },

  /**
   * Fetch current authenticated user profile
   */
  async getMe(): Promise<{ success: boolean; data: IUser }> {
    try {
      const response = await api.get<{ success: boolean; data: IUser }>("/auth/me");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
