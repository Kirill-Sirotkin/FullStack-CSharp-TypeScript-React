import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import UserCreateInfo from "../types/UserCreateInfo";
import UserCredentials from "../types/UserCredentials";
import User from "../types/User";
import axios, { AxiosError } from "axios";
import IdAndToken from "../types/IdAndToken";
import UserUpdateInfo from "../types/UserUpdateInfo";

interface UserReducer {
  token: string;
  currentUser: User;
  viewableUser: User;
  users: User[];
  loading: boolean;
  errorMessageLogin: string;
  errorMessageRegister: string;
  deleteSuccessful?: boolean;
}

const emptyUser: User = {
  id: "",
  firstName: "",
  lastName: "",
  role: -1,
};

const initialState: UserReducer = {
  loading: false,
  users: [],
  token: "",
  currentUser: emptyUser,
  viewableUser: emptyUser,
  errorMessageLogin: "",
  errorMessageRegister: "",
};

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
      if (state.currentUser) state.currentUser.role = 0;
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
        console.log(action.payload);
      } else {
        state.currentUser = action.payload;
        state.errorMessageLogin = "";
      }
    });
    build.addCase(getUserViewableById.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload);
      } else {
        state.viewableUser = action.payload;
        state.errorMessageLogin = "";
      }
    });
    build.addCase(getUsers.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload);
      } else {
        state.users = action.payload;
        state.errorMessageLogin = "";
      }
    });
    build.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        console.log(action.payload);
      }
    });
    build.addCase(deleteUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
        state.deleteSuccessful = false;
      } else {
        state.deleteSuccessful = true;
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

export const getUsers = createAsyncThunk(
  "getUsers",
  async (token?: string | null) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const result = await axios.get<User[]>(
        "https://lirbarymanagementproject.azurewebsites.net/api/v1/Users",
        config
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
  async (credentials: IdAndToken) => {
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

export const getUserViewableById = createAsyncThunk(
  "getUserViewableById",
  async (credentials: IdAndToken) => {
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

export const updateUser = createAsyncThunk(
  "updateUser",
  async (updateInfo: { user: UserUpdateInfo; idAndToken: IdAndToken }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${updateInfo.idAndToken.token}`,
      },
    };
    try {
      const result = await axios.patch<User>(
        `https://lirbarymanagementproject.azurewebsites.net/api/v1/Users/${updateInfo.idAndToken.id}`,
        updateInfo.user,
        config
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (idAndToken: IdAndToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${idAndToken.token}`,
      },
    };
    try {
      const result = await axios.delete<boolean>(
        `https://lirbarymanagementproject.azurewebsites.net/api/v1/Users/${idAndToken.id}`,
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
