// what a user object looks like
// This describes a logged-in user.
export interface User {
  id: number;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
}

// This is the form data sent when a user tries to log in.
// So when the login form collects values, it should match this structure:
export interface LoginCredentials {
  email: string;
  password: string;
}

// This is what the backend usually sends back after successful login.
export interface LoginResponse {
  user: User;
  token: string;
}

// This is the complete state for authentication.
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
