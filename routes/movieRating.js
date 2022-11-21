const express = require('express');
const { checkIDInput, checkIDExist, verifyToken } = require('../middleware');
const MovieRating = require('../models').MovieRating;
const Movie = require('../models').Movie;
const router = express.Router();

/**
 * Function to get all movie ratings
 * @param req
 * @param res
 * @returns MovieRating Types Array
 */
router.get('/', function(req, res){
    MovieRating.findAll({
        include: [Movie]
    }).then(ratings => {
        res.status(200).json(ratings);
    });
});

/**
 * Function to create new movie rating
 * @param req contains body.rating and body.movieId
 * @param res
 * @returns MovieRating created
 */
router.post('/', verifyToken, function(req, res){
    MovieRating.create({
        rating: req.body.rating,
        movieId: req.body.movieId,
    }).then(rating => {
        res.status(200).json(rating);
    }).catch(err => {
        res.status(405).json('Error has occured');
    });
});

/**
 * Function to get movie rating by given ID
 * @param req contains params.id
 * @param res
 * @returns MovieRating
 */
router.get('/:id', [verifyToken, checkIDInput, checkIDExist(MovieRating)], function(req, res){
    MovieRating.findByPk(req.params.id, { include: [Movie] }).then(movieRating => {
        res.status(200).json(movieRating);
    });
});

/**
 * Function to update movie rating by given ID
 * @param req contains body.rating, params.id
 * @param res
 * @returns Movie
 */
router.put('/:id', [verifyToken, checkIDInput, checkIDExist(MovieRating)], function(req, res){
    MovieRating.update({
        rating: req.body.rating,
    },{
        where: { id: req.params.id }
    }).then(() => {
        MovieRating.findByPk(req.params.id).then(movieRating =>  res.status(200).json(movieRating));
    });
});

/**
 * Function to delete movie rating by given ID
 * @param req contains params.id
 * @param res
 * @returns Movie
 */
router.delete('/:id', [verifyToken, checkIDInput, checkIDExist(MovieRating)], function(req, res){
    MovieRating.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;