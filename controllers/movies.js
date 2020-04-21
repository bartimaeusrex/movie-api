
const movies = require('../movies')

const getAllMovies = (request, response) => {
  return response.send(movies)
}

// const isPartialMatch = (request, response, next) => {
//   if (!request.params) return response.sendStatus(400)

//   request.params = request.params.includes()
//   next()
// }

const getMovieByTitle = (request, response) => {
  const { title } = request.params

  const matchingMovie = movies.filter(movie => {
    const isPartialMatch = (movie.directors.concat(movie.title)).join().toLowerCase()

      return isPartialMatch.includes(title.toLowerCase())
    })
  return matchingMovie.length
    ? response.send(matchingMovie) // || response.send(isPartialMatch)
    : response.status(404).send('Can\'t find that movie.')
}

// ////

// const getMovieByDirector = (request, response) => {
//   const { directors } = request.params

// // have to search the ARRAY, not just the string!!
// // also: should return ALL of that directors films, ideally.
// // Returning them ALL would take a filter()...
//   const matchingDirector = movies.find((movie) =>
//     movie.directors.toLowerCase() === directors.toLowerCase())

//   return matchingDirector
//     ? response.send(matchingDirector)
//     : response.status(404).send('Can\'t find that movie.')
// }

//
// to account for partials, .includes() seems the likeliest tactic.
// 
// const matchingMovie = movies.find((movie) =>
//   movie.title.toLowerCase() === title.toLowerCase() )
// sentence.includes(word.toLowerCase())
// 
//   const partialMatch = movies.find((movie) => {
//   movie.title.includes(title)
// return matchingMovie
// }


// /////////////////////////////////////////////////////////////////////////////

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
// functionally:
// movies = movies.concat([newMovie])
// ...but that would mess with the movies variable at the very top.
  movies.push(newMovie)

  return response.status(201).send(newMovie)
}

module.exports = { getAllMovies, getMovieByTitle, saveNewMovie }
