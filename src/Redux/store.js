import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer/userReducer";
import { projectReducer } from "./projectReducer/projectReducer";
import { userProjectReducer } from "./userProjectReducer/userProjectReducer";

export const store = configureStore({
  reducer: { userReducer, projectReducer, userProjectReducer },
});
