import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    projects:[]
};

const projectSlice = createSlice({
    initialState:INITIAL_STATE,
    name:"project",
    reducers:{
        addProject:(state,action)=>{
            state.projects = state.projects.push(action.payload)
        },
        removeProject:(state,action)=>{
            state.projects = state.projects.filter((item)=> item.name !== action.payload)
        },
        loadProject:(state,action)=> {
            state.projects = action.payload
        },
        editPlots:(state,action)=>{

            state.projects[action.payload.projectId].plots = action.payload.plot
        }
    }
});

export const projectReducer = projectSlice.reducer;
export const projectActions = projectSlice.actions;
export const projectSelectors = (state) => state.projectReducer.projects;