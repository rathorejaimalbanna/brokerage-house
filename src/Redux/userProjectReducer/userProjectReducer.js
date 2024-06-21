import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  projects: [],
};

const projectSlice = createSlice({
  initialState: INITIAL_STATE,
  name: "userProject",
  reducers: {
    addProject: (state, action) => {
      state.projects = state.projects.puch(action.payload);
    },
    loadProject: (state, action) => {
      state.projects = action.payload;
    },
    editProject: (state, action) => {
      state.projects = action.payload.projectObject;
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(
        (item) => item.name !== action.payload
      );
    },
  },
});

export const userProjectReducer = projectSlice.reducer;
export const userProjectActions = projectSlice.actions;
export const userProjectSelector = (state) => state.userProjectReducer.projects;
