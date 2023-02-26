import { createSlice } from "@reduxjs/toolkit";


export const usersSlice = createSlice({
    name : 'users' ,
    initialState : [] ,
    reducers : {
        "INIT_USERS" : (state , action) => {
            return action.payload.data
        } ,
        "ADD_USER" : (state , action) => {
            return [
                ...state ,
                action.payload.data
            ]
        } ,
        "DELETE_USER" : (state , action) => {
            const filteredState = state.filter(user => user.id !== +action.payload.id)
            return filteredState
        }
    }
})

export default usersSlice.reducer