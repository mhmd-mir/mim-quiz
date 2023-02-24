import { combineReducers } from "@reduxjs/toolkit";


// reducers => 
import examsReducer from './slices/exams'
import loadingReducer from './slices/loading'

export const allReducers = combineReducers({
    exams : examsReducer ,
    loading : loadingReducer
})
