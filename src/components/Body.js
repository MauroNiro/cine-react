import { useState } from 'react';
import data from '../movies'
import Main from './Main';
import { validateQuantity } from '../functions/Validations/validateShow';
import getDirector from '../functions/Directors/getDirector'


export default function Body() {
    const [movies, setMovies] = useState(data)
    const [shows, setShows] = useState([])

    function setShow(showForm, movie) {
        console.log("entro")
        let passedValidation = false
        setShows(prevShows => {
            if (validateQuantity(showForm, movie, prevShows)) {
                console.log("entro aca")
                const newShow = {
                    showId: prevShows.length + 1,
                    movieId: movie.movieId,
                    date: showForm.date,
                    price: showForm.price,
                    length: movie.length,
                    directorId: movie.directorId,
                    directorName: getDirector(movie.directorId)
                }
                passedValidation = true
                return [...prevShows, newShow]
            }
            else return [...prevShows]
        })
        return passedValidation;
    }

    function editShow(showForm, movie, showId) {
        let passedValidation = false
        setShows(prevShow => {
            return prevShow.map(show => {
                if (show.showId === showId) {
                    const showDate = new Date(show.date)
                    const formDate = new Date(showForm.date)
                    if (showDate !== formDate) {
                        if (validateQuantity(showForm, movie, prevShow)) {
                            passedValidation = true
                            return { ...show, price: showForm.price, date: showForm.date }
                        }
                    }
                    else {
                        passedValidation = true
                        return { ...show, price: showForm.price, date: showForm.date }
                    }
                }
                return show;
            })
        })
        return passedValidation;
    }

    function deleteShow(showId) {
        setShows(prevShows => {
            const updatedShow = prevShows.filter(show => show.showId !== showId)
            return updatedShow
        })
    }

    const moviesComp = movies.map(movie => {
        return (
            <Main className="body-movies"
                key={movies.movieId} handleAdd={setShow} handleEdit={editShow} handleDelete={deleteShow} movie={movie} shows={shows} />
        )
    })

    return (
        <div>
            <div className='body'>
                {moviesComp.length === 0 ?
                    <h3>No hay Peliculas cargadas</h3> :
                    moviesComp}
            </div>
            <div className='d-flex button-body mt-3'>
            </div>
        </div>
    )
}