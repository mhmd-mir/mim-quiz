import { createSlice } from "@reduxjs/toolkit";


export const loadingSlice = createSlice({
    name : 'loader' ,
    initialState : false ,
    reducers : {
        "LOADING_ON" : (state , action) => {
            return true
        } ,
        "LOADING_OFF" : (state , action) => {
            return false
        }
    }
})

export default loadingSlice.reducer