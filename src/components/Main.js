import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ShowsForm from './ShowsForm';

export default function Main(props) {
    //initialize variables or make them more accessible
    const movie = props.movie
    const shows = props.shows
    const [toggleShows, setToggleShows] = useState(false)
    const [form, setForm] = useState(false)
    const [selectedShowId, setSelectedShowId] = useState(0)
    //opens the edit/add form
    function toggleForm() {
        setForm(prevForm => !prevForm)
        if (!form) {
            setSelectedShowId(0)
        }
    }
    //open the shows for the selected movie
    function toggleShow() {
        setToggleShows(prevToggle => !prevToggle);
    }
    //sets a new show, if it goes ok then closes the form
    function setShow(showForm, movie) {
        if (props.handleAdd(showForm, movie)) {
            console.log("entro al if")
            toggleForm();
        }
    }
    //edits a show, if it goes ok then closes the form
    function editShow(showForm, movie, showId) {
        if (props.handleEdit(showForm, movie, showId)) {
            toggleForm();
        }
    }
    //filter the shows and handlesDelete directly from the button
    const showMovie = shows.filter(show => show.movieId === movie.movieId)
    const showsMovies = showMovie.map(show => {
        return (
            <div>
                <p>Fecha:{show.date}</p>
                <p>Director:{show.directorName}</p>
                <p>Duracion: {show.length}</p>
                <p>Precio: {show.price}</p>
                <Button onClick={() => { toggleForm(); setSelectedShowId(show.showId) }}>Editar</Button>
                <Button onClick={() => props.handleDelete(show.showId)}>Borrar</Button>
            </div >
        )
    }
    )

    return (
        < Card className='card-movies' >
            <Card.Body >
                <Card.Title>{movie.movieId}</Card.Title>
                <Card.Text>{movie.movieName}</Card.Text>
                <Card.Img src={movie.movieImg} alt="Imagen de la película" />
                <div className="d-flex gap-4 mt-3">
                    <Button onClick={toggleShow}>{!toggleShows ? "Ver Funciones" : "Dejar de ver funciones"}</Button>
                </div>
            </Card.Body>
            {toggleShows && showMovie.length > 0 ?
                <>
                    <h4>Funciones de {movie.movieName}</h4>
                    {showsMovies}
                </>
                : toggleShows &&
                <h4>No hay funciones de:{movie.movieName}</h4>}
            {toggleShows &&
                <div className='d-flex button-body mt-3'>
                    <Button onClick={toggleForm}>Agregar</Button>
                </div>}
            <ShowsForm key={shows.length} show={form} handleAdd={setShow} handleEdit={editShow} handleClose={toggleForm} showId={selectedShowId} movie={props.movie} />
        </Card >
    )
}
