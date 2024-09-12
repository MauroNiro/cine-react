import { useState } from 'react';
import data from '../movies'
import Main from './Main';
import getDirector from '../functions/Directors/getDirector'


export default function Body() {
    const [movies, setMovies] = useState(data)
    const [shows, setShows] = useState([])

    const addShow = (showForm, movie) => {
        setShows(prevShows => {
            const newShow = {
                showId: prevShows.length + 1,
                movieId: movie.movieId,
                date: showForm.date,
                price: showForm.price,
                length: movie.length,
                directorId: movie.directorId,
                directorName: getDirector(movie.directorId)
            }
            return [...prevShows, newShow]
        })
    }

    const editShow = (showForm, showId) => {
        setShows(prevShow => (
            prevShow.map(show => {
                if (show.showId === showId) {
                    return { ...show, price: showForm.price, date: showForm.date }
                }
                return { ...show }
            })
        ))

    }

    const deleteShow = (showId) => {
        setShows(prevShows => {
            const updatedShow = prevShows.filter(show => show.showId !== showId)
            return updatedShow
        })
    }

    const moviesComp = movies.map(movie => {
        return (
            <Main
                key={movie.movieId} handleAdd={addShow} handleEdit={editShow} handleDelete={deleteShow} movie={movie} shows={shows} />
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