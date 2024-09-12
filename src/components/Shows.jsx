import { Button } from "react-bootstrap";
const ShowsForm = ({ shows, movie, form, toggleForm, getShowSpec, handleDelete }) => {
    const showsMovies = shows.filter(show => show.movieId === movie.movieId).map(show => {
        const showDate = new Date(show.date);
        const showMinute = showDate.getMinutes() < 10 ? "0" + showDate.getMinutes() : showDate.getMinutes();
        const fecha = `Fecha: ${showDate.getDate()}/${showDate.getMonth() + 1}/${showDate.getFullYear()} ${showDate.getHours()}:${showMinute}`;

        return (
            <div className="mt-1 rounded border border-secondary" key={show.showId}>
                <p className='ms-1'>{fecha}</p>
                <p className='ms-1'>Director: {show.directorName}</p>
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
        );
    });
    const noShowsMessage = <p>No hay funciones programadas</p>;

    return (
        <div>
            {showsMovies.length > 0 ? showsMovies : noShowsMessage}
        </div>
    );
};

export default ShowsForm;