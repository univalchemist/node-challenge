const express = require('express');
const { Op } = require("sequelize");
const { PAGE_LIMIT } = require('../constant');
const { checkIDInput, checkIDExist, verifyToken } = require('../middleware');
const Actor = require('../models').Actor;
const Movie = require('../models').Movie;
const router = express.Router();

/**
 * Function to get all actors
 * @param req query.q is query param for first name, last name and query.page is offset for pagination
 * @param res
 * @returns Actor Types Array
 */
router.get('/', function(req, res){
    const query = req.query.q ?? ''
    const page = req.query.page ?? 1
    Actor.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    firstName: {
                        [Op.like]: '%' + query + '%'
                    }
                },
                {
                    lastName: {
                        [Op.like]: '%' + query + '%'
                    }
                }
            ]
        },
        subQuery: true,
        limit: PAGE_LIMIT,
        offset: (page - 1) * PAGE_LIMIT,
        include: [Movie]
    }).then(actors => {
        res.status(200).json(actors);
    });
});

/**
 * Function to create new actor
 * @param req contains body.firstName and body.lastName
 * @param res
 * @returns Actor created
 */
router.post('/', verifyToken, function(req, res){
    Actor.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }).then(actor => {
        res.status(200).json(actor);
    }).catch(err => {
        res.status(405).json('Error has occured');
    });
});

/**
 * Function to get actor by given ID
 * @param req contains params.id
 * @param res
 * @returns Actor
 */
router.get('/:id', [verifyToken, checkIDInput, checkIDExist(Actor)], function(req, res){
    Actor.findByPk(req.params.id, { include: [Movie] }).then(actor => {
        res.status(200).json(actor);
    });
});

/**
 * Function to update actor by given ID
 * @param req contains body.firstName and body.lastName that want to update, params.id to update
 * @param res
 * @returns Actor
 */
router.put('/:id', [verifyToken, checkIDInput, checkIDExist(Actor)], function(req, res){
    Actor.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }, {
        where: { id: req.params.id }
    }).then(() => {
        Actor.findByPk(req.params.id).then(actor =>  res.status(200).json(actor));
    });
});

/**
 * Function to delete actor by given ID
 * @param req contains params.id
 * @param res
 * @returns Actor
 */
router.delete('/:id', [verifyToken, checkIDInput, checkIDExist(Actor)], function(req, res){
    Actor.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;