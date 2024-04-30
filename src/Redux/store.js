import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer/userReducer";
import { projectReducer } from "./projectReducer/projectReducer";

export const store = configureStore({
    reducer:{userReducer,projectReducer}
})