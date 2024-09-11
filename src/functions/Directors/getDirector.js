import director from '../../directors'
export default function getDirector(directorId) {
    const directorVar = director.find(director => director.directorId == directorId)
    return directorVar.directorName
}