import { createSlice } from "@reduxjs/toolkit";


export const examsSlice = createSlice({
    name : 'exams' ,
    initialState : [] ,
    reducers : {
        "INIT_EXAMS" : (state , action) => {
            return action.payload.data
        }
    }
})

export default examsSlice.reducer