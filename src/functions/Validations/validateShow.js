//this should also go as a constant?
const validateQuantity = (showForm, movie, shows) => {
    const cantShows = shows.filter(show => {
        const showDate = new Date(show.date)
        const formDate = new Date(showForm.date)
        return show.movieId === movie.movieId
            && showDate.getDate() === formDate.getDate()
            && showDate.getMonth() === formDate.getMonth()
            && showDate.getFullYear() === formDate.getFullYear()
    })
    if (cantShows.length >= 8 && !movie.isNational) {
        return false;
    }
    const cantShowsDirector = shows.filter(show => {
        const showDate = new Date(show.date)
        const formDate = new Date(showForm.date)
        return showDate.getDate() === formDate.getDate()
            && showDate.getMonth() === formDate.getMonth()
            && showDate.getFullYear() === formDate.getFullYear()
            && show.directorId === movie.directorId
    })
    if (cantShowsDirector.length >= 10) {
        return false
    }
    return true
}
export default validateQuantity