
const movies = require('../movies')

const getAllMovies = (request, response) => {
  return response.send(movies)
}

const getMovieByKeyword = (request, response) => {
  const { title } = request.params

  const matchingMovie = movies.filter(movie => {
    const isPartialMatch = (movie.directors.concat(movie.title)).join().toLowerCase()

      return isPartialMatch.includes(title.toLowerCase())
    })
  return matchingMovie.length
    ? response.send(matchingMovie)
    : response.status(404).send('Can\'t find that movie.')
}

const saveNewMovie = (request, response) => {
  const {
    title, directors, releaseDate, rating, runTime, genres
  } = request.body

  if ( !title || !directors || !releaseDate || !rating || !runTime || !genres ) {
    return response.status(400).send('All fields are required.')
  }

  const newMovie = {
    title, directors, releaseDate, rating, runTime, genres
  }

  movies.push(newMovie)

  return response.status(201).send(newMovie)
}

module.exports = { getAllMovies, getMovieByKeyword, saveNewMovie }
