import director from '../../directors'
//this should also go as a constant?
const getDirector = (directorId) => {
    const directorVar = director.find(director => director.directorId === directorId)
    return directorVar.directorName
}
export default getDirector;