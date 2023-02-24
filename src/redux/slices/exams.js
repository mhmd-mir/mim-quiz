import { createSlice } from "@reduxjs/toolkit";


export const examsSlice = createSlice({
    name : 'exams' ,
    initialState : [] ,
    reducers : {
        "INIT_EXAMS" : (state , action) => {
            return action.payload.data
        } ,
        "ADD_EXAM" : (state , action) => {
            return [
                ...state ,
                action.payload.data
            ]
        } ,
        "UPDATE_EXAMS" : (state , action) => {
            const index = state.findIndex(exam => exam.id === +action.payload.id)
            state[index] = action.payload.data
        } ,
        "DELETE_EXAM" : (state , action) => {
            const filteredState = state.filter(exam => exam.id !== +action.payload.id)
            return filteredState
        }
    }
})

export default examsSlice.reducer