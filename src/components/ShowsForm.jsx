import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import validateQuantity from '../functions/Validations/validateShow';

const ShowsForm = ({ show, handleClose, handleAdd, handleEdit, handleDelete, shows, movie }) => {
    //initializes states and make variables more accesible
    const [showId, setShowId] = useState(0)
    const [form, setForm] = useState(false)
    const [formError, setFormError] = useState(false)
    const [quantityError, setQuantityError] = useState(false)
    const [showsMovies, setShowsMovies] = useState(<p>No hay funciones programadas</p>)
    const [showSpec, setShowSpec] = useState({
        date: new Date(),
        price: 0,
    })
    //resets when adding a new show
    const resetShowSpec = () => {
        setShowSpec({
            date: new Date(),
            price: 0
        })
    }
    //sets showId and brings the old data for the edit
    const getShowSpec = (showId) => {
        setShowId(showId)
        const showToEdit = shows.find(show => show.showId === showId)
        setShowSpec({
            date: showToEdit.date,
            price: showToEdit.price
        })
    }
    //if form has been closed the errors go back to false and reset the showId
    const toggleForm = () => {
        setShowId(0)
        setForm(prevState => !prevState)
        setFormError(false)
        setQuantityError(false)
    }
    //executes everytime a value is changed
    const changeShow = (event) => {
        const { name, value } = event.target
        setShowSpec(prevShowSpec => {
            return {
                ...prevShowSpec,
                [name]: value
            }
        })
    }
    //addShow and editShow are made this way to close the toggle
    const addShow = (showSpec, movie) => {
        handleAdd(showSpec, movie)
        toggleForm()
    }
    const editShow = (showSpec, showId) => {
        handleEdit(showSpec, showId)
        toggleForm()
    }
    //buttons for add or edit in the form
    const editAddButtonForm = () => {
        if (showId === 0) {
            return (
                <Button variant="primary" onClick={() =>
                    validateItems() && addShow(showSpec, movie)
                }>
                    Agregar Funcion
                </Button>
            )
        }
        return (
            <Button variant="primary" onClick={() => {
                validateItems() && editShow(showSpec, showId);
            }}>
                Editar Funcion
            </Button>
        )
    }

    //checks for conditions
    const validateItems = () => {
        const date = new Date(showSpec.date)
        if (date >= Date.now() && showSpec.price > 0) {
            if (showId !== 0) {
                const show = shows.find(show => (show.showId === showId))
                const showDate = new Date(show.date)
                const formDate = new Date(showSpec.date)
                if (showDate.getDate() !== formDate.getDate() || showDate.getMonth() !== formDate.getMonth() || showDate.getFullYear() !== formDate.getFullYear()) {
                    if (!validateQuantity(showSpec, movie, shows)) {
                        setQuantityError(true)
                        return false
                    }
                }
                return true
            }
            if (validateQuantity(showSpec, movie, shows)) {
                return true
            }
            else {
                setQuantityError(true)
                return false
            }
        }
        setFormError(true)
        return false
    }

    //I dont know if this is correct
    useEffect(() => {
        const showMovie = shows.filter(show => show.movieId === movie.movieId)
        if (showMovie.length > 0) {
            setShowsMovies(showMovie.map(show => {
                const showDate = new Date(show.date)
                const showMinute = showDate.getMinutes() < 10 ? "0" + showDate.getMinutes() : showDate.getMinutes()
                const fecha = `Fecha: ${showDate.getDate()}/${showDate.getMonth() + 1}/${showDate.getFullYear()} ${showDate.getHours()}:${showMinute}`
                return (
                    <div className="mt-1 rounded border border-secondary" key={show.showId}>
                        <p className='ms-1'>{fecha}</p>
                        <p className='ms-1'>Director:{show.directorName}</p>
                        <p className='ms-1'>Duracion: {show.length}</p>
                        <p className='ms-1'>Precio: {show.price}</p>
                        {
                            !form &&
                            <>
                                <Button className="ms-1 mb-3 me-2" onClick={() => { toggleForm(); getShowSpec(show.showId) }}>Editar</Button>
                                <Button variant='secondary' className="mb-3" onClick={() => handleDelete(show.showId)}>Borrar</Button>
                            </>
                        }
                    </div>
                )
            }))
        }
        else {
            setShowsMovies(<p>No hay funciones programadas</p>)
        }
    }, [shows, movie, handleDelete, form])

    return (
        <Modal show={show} onHide={() => { toggleForm(); handleClose() }}>
            <Modal.Header closeButton>
                <Modal.Title>Funciones de {movie.movieName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showsMovies}
                <Button className='mt-2' onClick={() => { toggleForm(); resetShowSpec() }}>{!form ? "Agregar" : "Cerrar formulario"}</Button>
            </Modal.Body>
            {form &&
                <>
                    <Form>
                        <Form.Group controlId="formDate">
                            <Form.Label className='ms-2'>Fecha:</Form.Label>
                            <Form.Control className="w-50 ms-3" name="date" value={showSpec.date} onChange={changeShow} type='datetime-local'></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className='ms-2'>Precio:</Form.Label>
                            <Form.Text>
                                <Form.Control className='w-50 ms-3' name='price' value={showSpec.price} type='number' onChange={changeShow}></Form.Control>
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    <Modal.Footer>
                        {formError &&
                            <Alert variant="danger" onClose={() => setFormError(false)} dismissible>
                                Error: La fecha debe ser en el futuro o el precio es menor o igual a cero.
                            </Alert>}
                        {quantityError &&
                            <Alert variant="danger" onClose={() => setQuantityError(false)} dismissible>
                                Error: Ya alcanzo el limite de funciones para este tipo de peliculas en este dia.
                            </Alert>}
                        {editAddButtonForm()}
                    </Modal.Footer>
                </>}
        </Modal>
    )
}
export default ShowsForm;