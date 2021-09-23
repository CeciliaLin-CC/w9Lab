//https://hub.packtpub.com/building-movie-api-express/
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
app.listen(8080);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let path = require('path');
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);///1
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actores/:aid/:mid', actors.deleteMovie);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/moviesDeleteActor/:mid/:aid', movies.deleteActor);
app.delete('/moviesDeleteByActor/:mid/:aid', movies.deletebyActor);
app.post('/movies/:mid/:aid', movies.addActor)
app.get('/moviesBetweenYear1Year2/:fy/:ly', movies.getMoviesYear1Years2);
app.delete('/moviesDeleteYear1Year2/:fy/:ly', movies.deleteMoviesYear1Years2);
app.get('/movies/actor-count/:mid', movies.actorCount);
//
app.delete('/moviesDeleteByTitle/:mt', movies.deletebyTitle);
