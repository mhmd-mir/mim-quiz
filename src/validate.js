
// validator functions

export const required = (tag , value) => {
    return {
        [tag] : value?.length ? true : false
    }
}

export const isNumber = (tag , value) => {
    return {
        [tag] : !isNaN(value)
    }
}

export const isDate = (tag , value) => {
    return {
        [tag] : /^\d\d\d\d\/\d\d\/\d\d$/.test(value)
    }
}



// another functions


export const validateAllResults = (resultsObject) => {
    for (const key in resultsObject) {
        if (Object.hasOwnProperty.call(resultsObject , key)) {
            const resStatus = resultsObject[key];
            if(resStatus){
                continue ;
            }else{
                return { inValidElem : key }
            }
        }
    }
    return true
}


