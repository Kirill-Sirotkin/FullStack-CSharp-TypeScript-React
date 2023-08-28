import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import UserCreateInfo from "../types/UserCreateInfo";
import UserCredentials from "../types/UserCredentials";
import User from "../types/User";
import axios, { AxiosError } from "axios";

interface UserReducer {
  token: string;
  currentUser: User;
  loading: boolean;
  errorMessageLogin: string;
  errorMessageRegister: string;
}

const emptyUser: User = {
  id: "",
  firstName: "",
  lastName: "",
  role: "",
};

const initialState: UserReducer = {
  loading: false,
  token: "",
  currentUser: emptyUser,
  errorMessageLogin: "",
  errorMessageRegister: "",
};

interface UserFetchPayload {
  token?: string | null;
  id?: string | null;
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logOutUser: (state) => {
      state.currentUser = emptyUser;
      state.token = "";
      state.errorMessageLogin = "";
      state.errorMessageRegister = "";
    },
    promoteToAdmin: (state) => {
      if (state.currentUser) state.currentUser.role = "admin";
    },
  },
  extraReducers: (build) => {
    build.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.errorMessageRegister = action.payload.message;
      } else {
        state.currentUser = action.payload;
        state.errorMessageRegister = "";
      }
    });
    build.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.errorMessageLogin = "Wrong email or password";
        state.currentUser = emptyUser;
      } else {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
        state.errorMessageLogin = "";
      }
    });
    build.addCase(getUserById.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.errorMessageLogin = "Cannot authenticate";
      } else {
        state.currentUser = action.payload;
        state.errorMessageLogin = "";
      }
    });
  },
});

export const registerUser = createAsyncThunk(
  "registerUser",
  async (user: UserCreateInfo) => {
    try {
      const result = await axios.post<User>(
        "https://lirbarymanagementproject.azurewebsites.net/api/v1/Users",
        user
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (credentials: UserCredentials) => {
    try {
      const result = await axios.post<string>(
        "https://lirbarymanagementproject.azurewebsites.net/api/v1/Auth",
        credentials
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const getUserById = createAsyncThunk(
  "getUserById",
  async (credentials: UserFetchPayload) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials.token}`,
      },
    };
    try {
      const result = await axios.get<User>(
        `https://lirbarymanagementproject.azurewebsites.net/api/v1/Users/${credentials.id}`,
        config
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const userReducer = userSlice.reducer;
export const { logOutUser, promoteToAdmin } = userSlice.actions;
export default userReducer;
