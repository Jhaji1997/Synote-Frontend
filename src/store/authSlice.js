import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser as registerAPI,
  loginUser as loginAPI,
  logoutUser as logoutAPI,
  updateAvatar as updateAvatarAPI,
  getCurrentUser,
  refreshAccessToken,
} from "../services/authService.js";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      await registerAPI(formData);
      const user = await getCurrentUser();
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "SignUp Failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      await loginAPI(formData);
      const user = await getCurrentUser();
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login Failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logoutAPI();
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue("Logout Failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      await refreshAccessToken();
      const user = await getCurrentUser();
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue("Token refresh failed");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue("Token refresh failed");
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (avatarImage, thunkAPI) => {
    try {
      await updateAvatarAPI(avatarImage);
      const user = await getCurrentUser();
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue("Avatar updation failed");
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch current user";
      })

      // refresh token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      // logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      })

      //avatar update
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state,action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateAvatar.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update avatar";
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
