import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ShowsForm from './ShowsForm';

const Main = ({ handleAdd, handleEdit, handleDelete, movie, shows }) => {
    //initialize State or make them more accessible
    const [toggleShows, setToggleShows] = useState(false)
    //open the shows for the selected movie
    const toggleShow = () => {
        setToggleShows(prevToggle => !prevToggle);
    }
    return (
        <Card>
            <Card.Body >
                <Card.Title>{movie.movieName}</Card.Title>
                <Card.Img src={movie.movieImg} alt="Imagen de la película" />
                <div className="d-flex gap-4 mt-3">
                    <Button onClick={toggleShow}>Ver Funciones</Button>
                </div>
            </Card.Body>
            <ShowsForm key={movie.movieId} show={toggleShows} handleClose={toggleShow} handleAdd={handleAdd} handleEdit={handleEdit} handleDelete={handleDelete} shows={shows} movie={movie} />
        </Card >
    )
}
export default Main
