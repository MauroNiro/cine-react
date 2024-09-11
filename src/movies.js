import ep1img from './images/Episode1.jpg'
import ep2img from './images/Episode2.jpg'
import matriximg from './images/Matrix.jpg'
import relatosimg from './images/RelatosSalvajes.jpeg'
const data = [
    {
        movieId: 1,
        movieName: "Star Wars Ep1",
        movieImg: ep1img,
        isNational: false,
        length: 120,
        directorId: 1
    },
    {
        movieId: 2,
        movieName: "Star Wars Ep2",
        movieImg: ep2img,
        isNational: false,
        length: 120,
        directorId: 1
    },
    {
        movieId: 3,
        movieName: "Matrix",
        movieImg: matriximg,
        length: 136,
        isNational: false,
        directorId: 2
    },
    {
        movieId: 4,
        movieName: "Relatos Salvajes",
        length: 122,
        movieImg: relatosimg,
        isNational: true,
        directorId: 3
    }
]
export default data;