import { combineReducers } from "@reduxjs/toolkit";

// reducers =>
import examsReducer from "./slices/exams";
import loadingReducer from "./slices/loading";
import questionsSlice from "./slices/questions";
import usersSlice from "./slices/users";

export const allReducers = combineReducers({
  exams: examsReducer,
  loading: loadingReducer,
  questions: questionsSlice,
  users: usersSlice,
});
