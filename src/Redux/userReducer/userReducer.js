import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user: [],
};

const userSlice = createSlice({
  initialState: INITIAL_STATE,
  name: "userData",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = [];
    },
    editBooking: (state, action) => {
      state.user.booking = action.payload;
    },
    editWithdrawl: (state, action) => {
      state.user.withdrawl = action.payload;
    },
    editBank: (state, action) => {
      state.user.bank = action.payload;
    },
    editProfile: (state, action) => {
      state.user.name = action.payload.name;
      state.user.address = action.payload.address;
      state.user.phone = action.payload.phone;
      state.user.imageUrl = action.payload.imageUrl;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelector = (state) => state.userReducer;
