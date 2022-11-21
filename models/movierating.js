'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Movie rating belongs to one movie
      MovieRating.belongsTo(models.Movie)
    }
  }
  MovieRating.init({
    rating: DataTypes.FLOAT,
    movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MovieRating',
  });
  return MovieRating;
};