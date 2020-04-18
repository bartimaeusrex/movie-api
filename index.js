const express = require('express')
const bodyParser = require('body-parser')
const { getAllMovies, getMovieByTitle, saveNewMovie } = require('./controllers/movies')
const app = express()

app.get('/movies', getAllMovies)

app.get('/movies/:title', getMovieByTitle)

app.post('/movies', bodyParser.json(), saveNewMovie)

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 8080.')
})
