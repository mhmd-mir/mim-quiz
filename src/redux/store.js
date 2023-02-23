import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { allReducers } from "./reducer";


// middlewares 
import API from './middlewares/API'
const store = configureStore({
    reducer : allReducers ,
    middleware : [
        API
    ]
})

export default store