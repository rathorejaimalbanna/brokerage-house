import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  projects: [],
};

const projectSlice = createSlice({
  initialState: INITIAL_STATE,
  name: "userProject",
  reducers: {
    addProject: (state, action) => {
      state.projects = state.projects.push(action.payload);
    },
    loadProject: (state, action) => {
      state.projects = action.payload;
    },
    editProject: (state, action) => {
      var projects = action.payload.projects;
      var index = projects.findIndex(
        (item) => item.name === action.payload.projectName
      );
      if (index !== -1) {
        state.projects[index] = { ...projects[index], projectStatus: "booked" };
      }
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(
        (item) => item.name !== action.payload
      );
    },
    editStatus: (state, action) => {
      state.projects = action.payload.projectObject;
    },
  },
});

export const userProjectReducer = projectSlice.reducer;
export const userProjectActions = projectSlice.actions;
export const userProjectSelector = (state) => state.userProjectReducer.projects;
