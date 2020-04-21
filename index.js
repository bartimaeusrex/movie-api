const express = require('express')
const bodyParser = require('body-parser')
const { getAllMovies, getMovieByTitle, saveNewMovie }
  = require('./controllers/movies')
const app = express()

// 1) A request for all data: DONE.
app.get('/movies', getAllMovies)

// -------> Good place for an: app.use(isPartialMatch())

// 3) A request for a movie by title
// ...but need to figure out how to get at words in the string
// which is done by .split(), I believe...
// eg /lord gets you The Lord of the Rings
app.get('/movies/:title', getMovieByTitle)

// and then same goes for ...
// 2) A REQUEST BY ALL MOVIES BY A DIRECTOR

// app.get('/movies/:directors', getMovieByDirector)

// eg /darabont gets you all Frank Darabont's movies
// eg all the objects that contain "darabont" in their directors
// will be returned. ...'Course, Darabont only directed one. Better use Spielberg.
// of course, all of this will probably be in the controllers file! :)

app.post('/movies', bodyParser.json(), saveNewMovie)

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 8080.')
})
