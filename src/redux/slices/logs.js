import { createSlice } from "@reduxjs/toolkit";


export const logSlice = createSlice({
    name : 'logs' ,
    initialState : [] ,
    reducers : {
        "INIT_LOGS" : (state , action) => {
            return action.payload.data
        } ,
        "ADD_LOG" : (state , action) => {
            return [
                ...state ,
                action.payload.data
            ]
        }
    }
})

export default logSlice.reducer