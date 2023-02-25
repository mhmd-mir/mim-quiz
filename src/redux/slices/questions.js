import { createSlice } from "@reduxjs/toolkit";


export const questionsSlice = createSlice({
    name : 'questions' ,
    initialState : [] ,
    reducers : {
        "INIT_QUESTIONS" : (state , action) => {
            return action.payload.data
        } ,
        "ADD_QUESTION" : (state , action) => {
            return [
                ...state ,
                action.payload.data
            ]
        } ,
        "DELETE_QUESTION" : (state , action) => {
            const filteredState = state.filter(question => question.id !== +action.payload.id)
            return filteredState
        }
    }
})

export default questionsSlice.reducer