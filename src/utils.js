export const convertToFastStructure = (structure) => {
    const fastStructure = {} 
    structure.forEach((data) => {
        const key = data.id ;
        fastStructure[key] = data
    })
    return fastStructure
}