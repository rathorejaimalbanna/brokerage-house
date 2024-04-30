import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    user:[]
};

const userSlice = createSlice({
    initialState:INITIAL_STATE,
    name:"userData",
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
        removeUser:(state)=>{
            state.user = []
        }
    }
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelector = (state)=> state.userReducer 