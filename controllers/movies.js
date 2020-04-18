//
// PULLING TEMPLATE FROM NFL API! CHANGE IT TO REFLECT MOVIE DATA!
//

const movies = require('../movies')

const getAllMovies = (request, response) => {
  return response.send(movies)
}

const getMovieByTitle = (request, response) => {
  const { title } = request.params

  const matchingMovie = movies.find((movie) => movie.title === title)

  return matchingMovie
    ? response.send(matchingMovie)
    : response.sendStatus(404)
}

// Below is silly, because there are no numbers in this set of data
// (particularly lastTitle + 1)
// what do I need to do instead, if the title is missing?
// Probably just error out: "A title is required."
// So! 
const getNewTitle = () => {
  const lastTitle = movies.reduce((acc, movie) => {
    return movie.title > acc ? movie.title : acc
  }, 0)

  return lastTitle + 1
}

const saveNewMovie = (request, response) => {
  const {
    title , directors, releaseDate, rating, runTime, genres
  } = request.body

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres ) {
    return response.status(400).send('All fields are required.')
  }

  const newMovie = {
    title, directors, releaseDate, rating, runTime, genres, title: getNewTitle()
  }
// functionally:
// movies = movies.concat([newMovie])
// ...but that would mess with the movies variable at the very top.
  movies.push(newMovie)

  return response.status(201).send(newMovie)
}

module.exports = { getAllMovies, getMovieByTitle, saveNewMovie }
