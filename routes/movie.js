const express = require('express');
const { Op } = require("sequelize");
const { PAGE_LIMIT } = require('../constant');
const { checkIDInput, checkIDExist, verifyToken, limiter } = require('../middleware');
const Actor = require('../models').Actor;
const Movie = require('../models').Movie;
const MovieRating = require('../models').MovieRating;
const router = express.Router();

/**
 * Function to get all movies
 * @param req query.q is query param for title and query.page is offset for pagination
 * @param res
 * @returns Movie Types Array
 */
router.get('/', limiter, function(req, res){
    const query = req.query.q ?? ''
    const page = req.query.page ?? 1
    Movie.findAndCountAll({
        where: {
            title: {
                [Op.like]: '%' + query + '%'
            }
        },
        subQuery: true,
        limit: PAGE_LIMIT,
        offset: (page - 1) * PAGE_LIMIT,
        include: [Actor, MovieRating]
    }).then(movies => {
        res.status(200).json(movies);
    });
});

/**
 * Function to create new movie
 * @param req contains body.title, body.yarn and body.actorId
 * @param res
 * @returns Movie created
 */
router.post('/', verifyToken, function(req, res){
    Movie.create({
        title: req.body.title,
        year: req.body.year,
        actorId: req.body.actorId,
    }).then(movie => {
        res.status(200).json(movie);
    }).catch(err => {
        res.status(405).json('Error has occured');
    });
});

/**
 * Function to get movie by given ID
 * @param req contains params.id
 * @param res
 * @returns Movie
 */
router.get('/:id', [verifyToken, checkIDInput, checkIDExist(Movie)], function(req, res){
    Movie.findByPk(req.params.id, { include: [Actor, MovieRating] }).then(movie => {
        res.status(200).json(movie);
    });
});

/**
 * Function to update movie by given ID
 * @param req contains body.title, body.yarn and body.actorId
 * @param res
 * @returns Movie
 */
router.put('/:id', [verifyToken, checkIDInput, checkIDExist(Movie)], function(req, res){
    Movie.update({
        title: req.body.title,
        year: req.body.year,
        actorId: req.body.actorId,
    },{
        where: { id: req.params.id }
    }).then(() => {
        Movie.findByPk(req.params.id).then(movie =>  res.status(200).json(movie));
    });
});

/**
 * Function to delete movie by given ID
 * @param req contains params.id
 * @param res
 * @returns Movie
 */
router.delete('/:id', [verifyToken, checkIDInput, checkIDExist(Movie)], function(req, res){
    Movie.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;