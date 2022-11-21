const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('sqlite3');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 8080;

// models
const models = require("./models");

// routes
const actors = require('./routes/actor');
const movies = require('./routes/movie');
const movieRatings = require('./routes/movieRating');

//Sync Database
models.sequelize.sync().then(function() {
    console.log('connected to database')
}).catch(function(err) {
    console.log(err)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// enabling CORS for all requests
app.use(cors());

// SwaggerUI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// register routes
app.use('/actors', actors);
app.use('/movies', movies);
app.use('/movie-ratings', movieRatings);

// index path
app.get('/', function(req, res){
    console.log('app listening on port: '+port);
    res.send('test express nodejs sqlite')
});

app.listen(port, function(){
    console.log('app listening on port: '+port);
});

module.exports = app;