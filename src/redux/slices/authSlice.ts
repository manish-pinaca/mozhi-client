import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IInitialAuthState {
  isLoading: boolean;
  error: string | null;
  username: string | null;
  isLoggedIn: boolean;
}

const initialState: IInitialAuthState = {
  isLoading: false,
  error: null,
  username: localStorage.getItem("username") || null,
  isLoggedIn: !!localStorage.getItem("isLoggedIn") || false,
};

export const signup = createAsyncThunk(
  "api/register",
  async (payload: RegisterParams) => {
    try {
      const formPayload = new FormData();
      formPayload.set("User_Name", payload.username);
      formPayload.set("Email_Id", payload.email);
      formPayload.set("New_Password", payload.password);
      formPayload.set("Confirm_Password", payload.confirmPassword);

      const { data } = await axios.post(
        "http://localhost:5000/signup",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message || "Something went wrong!");
    }
  }
);

export const login = createAsyncThunk(
  "api/login",
  async (payload: LoginParams) => {
    try {
      const formPayload = new FormData();
      formPayload.set("User_Name", payload.username);
      formPayload.set("Password", payload.password);

      const { data } = await axios.post(
        "http://localhost:5000/login",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.error) {
        throw new Error(data.error);
      }
      return { ...data, rememberMe: payload.rememberMe };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message || "Something went wrong!");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "api/forgotPassword",
  async (payload: ForgotPasswordParams) => {
    try {
      const formPayload = new FormData();
      formPayload.set("identifier", payload.email);

      const { data } = await axios.post(
        "http://localhost:5000/forget_password",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message || "Something went wrong!");
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "api/verifyOTP",
  async (payload: VerifyOTPParams) => {
    try {
      const formPayload = new FormData();
      formPayload.set("email", payload.email);
      formPayload.set("otp", payload.otp);

      const { data } = await axios.post(
        "http://localhost:5000/verify_otp",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message || "Something went wrong!");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "api/resetPassword",
  async (payload: ResetPasswordParams) => {
    try {
      const formPayload = new FormData();
      formPayload.set("identifier", payload.email);
      formPayload.set("otp", payload.otp);
      formPayload.set("new_password", payload.password);

      const { data } = await axios.post(
        "http://localhost:5000/reset_password",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      throw new Error(error.message || "Something went wrong!");
    }
  }
);

const authSlice = createSlice({
  name: "auhtSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message!;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      if (action.payload["rememberMe"]) {
        localStorage.setItem("username", action.payload["user_name"]);
        localStorage.setItem("isLoggedIn", "true");
      }
      state.username = action.payload["user_name"];
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message!;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message!;
    });
    builder.addCase(verifyOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyOTP.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message!;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message!;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
