import React, { useReducer } from 'react'

const reducerHandler = (state , action) => {
    switch(action.type){
        case 'SAVE_INPUT_DATA' : {
            return {
                ...state ,
                [action.payload.name] : action.payload.value 
            }
            break
        }
        default : {
            return state
        }
    }
}

export default function UseInputsDetails(initState) {

  const [inputsDetails , dispatch] = useReducer(reducerHandler , initState)


  return [inputsDetails , dispatch]
}
