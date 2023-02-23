import supabase from "../../supabase";


const API = (store) => (next) => async (action) => {
    if(action.type !== 'API_REQUEST'){
        next(action)
        return
    } 
    
    const { table , method  , body , onSuccessType , onErrorType } = action.payload ;
    
    switch(method){
        case "INIT" : {

            const { data, error } = await supabase
            .from(table)
            .select('*')
            
            if(data){
                // success type dispatch => 
                store.dispatch({
                    type : onSuccessType ,
                    payload : {
                        data
                    }
                })
            }
            
            break ;
        }
        default : {

        }
    }
    
}

export default API