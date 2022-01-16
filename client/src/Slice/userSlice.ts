import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../Interface/userInterface";

type userState = {
  user: IUser | null;
};

const initialState: userState = {
  user: null,
};

export const getMe = createAsyncThunk<IUser>("getMe/user", async () => {
  try {
    const response = await axios.get<IUser>(
      `${process.env.REACT_APP_BASE_URL}/users/get`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState.user,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
    deleteUser: (state) => {
      return null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      if (!state) {
        return { ...action.payload };
      }
    });
  },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
