'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Movie belongs to one actor
      Movie.belongsTo(models.Actor)
      // Movie has many ratings
      Movie.hasMany(models.MovieRating)
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    actorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};