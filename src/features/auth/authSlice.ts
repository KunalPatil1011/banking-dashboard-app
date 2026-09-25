import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState, LoginCredentials, LoginResponse } from "./authTypes";
import { loginApi } from "../../services/authApi";

// meaning No user logged in
// Suppose user enter Dashboard
// Protected routes execute
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// execute when user enter a value and dispatch value
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    // Simulate backend request
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await loginApi(credentials.email, credentials.password);
    console.log(response, "form authnslice response");
    return response;
  } catch (error: any) {
    if (error?.message === "Request failed with status code 404") {
      return rejectWithValue("Authentication service is unavailable.");
    }
    return rejectWithValue(
      error?.message || "Unable to connect to the authentication service.",
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // the pending state Immediately execute
    // store value true
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      //Backend Validation
      // Success Response
      // loginUser.fulfilled
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      // Store becomes:
      //       {
      //   auth:{
      //      user:{
      //         id:1,
      //         name:"John Doe"
      //      },
      //      token:"jwt",
      //      isAuthenticated:true
      //   }
      // }

      .addCase(loginUser.rejected, (state, action) => {
        console.log("Auth Error:", action.payload);
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error =
          action.payload ?? "Authentication failed. Please try again.";
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
