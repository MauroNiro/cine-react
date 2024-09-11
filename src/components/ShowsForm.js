import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function ShowsForm(props) {
    //initializes states and make variables more accesible
    const movie = props.movie
    const showId = props.showId
    const [showSpec, setShowSpec] = useState({
        date: new Date(),
        price: 0,
    })

    //executes everytime a value is changed
    function changeShow(event) {
        const { name, value } = event.target
        setShowSpec(prevShowSpec => {
            return {
                ...prevShowSpec,
                [name]: value
            }
        })
    }
    //checks for conditions
    function validateItems() {
        const date = new Date(showSpec.date)
        if (date >= Date.now() && showSpec.price > 0) {
            return true
        }
        return false
    }
    function toggleError() {

    }
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Show</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Completa el formulario para crear un show</h5>
                <Form>
                    <Form.Group controlId="formDate">
                        <Form.Label>Fecha:</Form.Label>
                        <input name="date" value={showSpec.date} onChange={changeShow} type='datetime-local'></input>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Precio:</Form.Label>
                        <Form.Text>
                            <input name='price' value={showSpec.price} type='number' onChange={changeShow}></input>
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cerrar
                </Button>
                {showId === 0 && <Button variant="primary" onClick={() =>
                    validateItems() ? props.handleAdd(showSpec, movie) : toggleError()
                }>
                    Agregar Funcion
                </Button>}
                {showId !== 0 && <Button variant="primary" onClick={() =>
                    validateItems() ? props.handleEdit(showSpec, movie, showId) : toggleError()
                }>
                    Editar Funcion
                </Button>}
                <p></p>
            </Modal.Footer>
        </Modal>
    );
}

export default ShowsForm;