var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var Movie = require('../models').Movie;

chai.use(chaiHttp);

describe('Movie API', function(){
    //Before each test we empty the database
    beforeEach(function(done){
        Movie.destroy({
            where: {},
            truncate: true
        });
        done();
    });
    describe('/GET movies', function(){
        it('Getting all movies', function(done){
            chai.request(app).get('/movies?q=&page=1').end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });
    describe('/POST movies', function(){
        it('Insert new movie', function(done){
            var movie = {
                title: 'Fight Club',
                year: '1999',
                actorId: 3,
            }
            chai.request(app)
                .post('/movies')
                .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.Tm9kZSBDUlVEIENoYWxsZW5nZQ._Blq2LZ15zEcAc4v0bjZeo7b6YXXPl_Y4FEOicpc3j0')
                .send(movie).end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe('/GET/:id movies', function(){
        it('Get movie by id', function(done){
            Movie.create({
                title: 'Fight Club',
                year: '1999',
                actorId: 3,
            }).then(function(movie){
                chai.request(app)
                    .get('/movies/'+movie.id)
                    .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.Tm9kZSBDUlVEIENoYWxsZW5nZQ._Blq2LZ15zEcAc4v0bjZeo7b6YXXPl_Y4FEOicpc3j0')
                    .end(function(err, res){
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
        it('Get movie by not existed id', function(done){
            chai.request(app)
                .get('/movies/100')
                .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.Tm9kZSBDUlVEIENoYWxsZW5nZQ._Blq2LZ15zEcAc4v0bjZeo7b6YXXPl_Y4FEOicpc3j0')
                .end(function(err, res){
                    res.should.have.status(400);
                    res.body.should.equal('Entity not found');
                    done();
                })
        });
        it('Get movie by invalid id', function(done){
            chai.request(app)
                .get('/movies/abc')
                .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.Tm9kZSBDUlVEIENoYWxsZW5nZQ._Blq2LZ15zEcAc4v0bjZeo7b6YXXPl_Y4FEOicpc3j0')
                .end(function(err, res){
                    res.should.have.status(400);
                    res.body.should.equal('Invalid ID supplied');
                    done();
                });
        });
    });
    describe('/PUT/:id movies', function(){
        it('Update movie by id', function(done){
            Movie.create({
                title: 'Fight Club',
                year: '1999',
                actorId: 3,
            }).then(function(movie){
                var movieEdit = {
                    title: 'Amor Fati',
                }
                chai.request(app)
                    .put('/movies/'+movie.id)
                    .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.Tm9kZSBDUlVEIENoYWxsZW5nZQ._Blq2LZ15zEcAc4v0bjZeo7b6YXXPl_Y4FEOicpc3j0')
                    .send(movieEdit).end(function(err, res){
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            })
        });
    });
    describe('/DELETE/:id movies', function(){
        it('Delete movie by id', function(done){
            Movie.create({
                title: 'Fight Club',
                year: '1999',
                actorId: 3,
            }).then(function(movie){
                chai.request(app)
                    .delete('/movies/'+movie.id)
                    .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.Tm9kZSBDUlVEIENoYWxsZW5nZQ._Blq2LZ15zEcAc4v0bjZeo7b6YXXPl_Y4FEOicpc3j0')
                    .end(function(err, res){
                        res.should.have.status(200);
                        res.body.should.equal(1);
                        done();
                    });
            })
        });
    });
});