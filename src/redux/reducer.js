import { combineReducers } from "@reduxjs/toolkit";


// reducers => 
import examsReducer from './slices/exams'

export const allReducers = combineReducers({
    exams : examsReducer
})
