
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

export const isEmail = (tag , value) => {
    return {
        [tag] : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    }
}

export const isFullArray = (tag , value = []) => {
    return {
        [tag] : value.length !== 0
    }
}

export const isPassword = (tag , value = '') => {
    return {
        [tag] : value.length >= 8
    }
}


export const isRole = (tag , value) => {
    return {
        [tag] : (value === 'ADMIN' || value === 'USER')
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


