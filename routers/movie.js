var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        let nm = new Movie(newMovieDetails);
        nm.save(function(err){
            if (err) return res.status(400).json(err);
            res.json();
        })
        // Movie.create(newMovieDetails, function (err, movie) {
        //     if (err) return res.status(400).json(err);
        //     res.json(movie);
        // });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    deleteActor: function (req, res) {
        Movie.findOne({ _id: req.params.mid }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOneAndRemove({ _id: req.params.aid }, function (err) {
                if (err) return res.status(400).json(err);
                res.json();
            });
        });
    },
    deletebyActor: function (req, res) {
        Actor.deleteOne({ _id: req.params.aid }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            for (var i=0; i<actor.movies.length; i++){
                Movie.deleteOne({ _id: actor.movies[i] }, function (err) {
                    if (err) return res.status(400).json(err);
                    res.json();
                });
            }
        });
    },
    deletebyTitle: function (req, res) {
        Movie.deleteMany({ 'title': req.params.mt }, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addActor: function (req, res) {
        Actor.findOne({ _id: req.params.aid }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.params.mid },  function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                movie.actors.push(req.params.aid);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
                
            });
        });
    },
    getMoviesYear1Years2: function (req, res) {
        Movie.where('year').gte(req.params.fy).lte(req.params.ly).exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteMoviesYear1Years2: function (req, res) {
        Movie.remove({ year:{ $lte:req.params.ly,$gte:req.params.fy } },function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });

        // Movie.where('year').gte(req.params.fy).lte(req.params.ly).exec(function (err, movie) {
        //     if (err) return res.status(400).json(err);
        //     if (!movie) return res.status(404).json();
        //     res.json(movie);
        // });
    },
    actorCount: function(req,res){
        Movie.findOne({ _id: req.params.mid },  function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            let num = movie.actors.length;
            let result = {
                status: "success",
                movieId: movie._id,
                actorCount: num
            }
            res.json(result);
        });
    }

};