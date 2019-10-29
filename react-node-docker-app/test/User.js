//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
let should = chai.should();
import assert from 'assert';
chai.use(chaiHttp);


// @route   POST api/crud/create
// @desc    Tests users route
// @access  Private


// @route   POST api/crud/read
// @desc    Tests users route
// @access  Private

// Lets user register route
describe('Credit Card Users', () => {


  var firsttest = {
              card_number: "4837 2178 3259 821",
              limit:20,
              balance:0
          }

   it('If form posted without name.', (done) => {

      chai.request(server)
          .post('/api/crud/create')
          .send(firsttest)
          .then((res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('name');
              done();
          }).catch(function (err) {
              return Promise.reject(err);
    })

  })



    var users = {
              name: "bharat",
              card_number: "4837 2178 3259 821",
              limit:20,
              balance:0
          }



 it('If cardit card number invalid supplied.', (done) => {

      chai.request(server)
          .post('/api/crud/create')
          .send(users)
          .then((res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('card_number');
              done();
          }).catch(function (err) {
              return Promise.reject(err);
    })

  })

 // set valid card cards 
 let validObject = {    
              name: "bharat",
              card_number: "4837 2178 3259 8214 ",
              limit:20,
              balance:0
          };

 it('If form sucessfully creats model.', (done) => {

      chai.request(server)
          .post('/api/crud/create')
          .send(validObject)
          .then((res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('_id');
              done();
          }).catch(function (err) {
              return Promise.reject(err);
    })

  })


  it('While getting credit card user from db', (done) => {

      chai.request(server)
          .get('/api/crud/read')
          .then((res) => {
              res.should.have.status(200);
              res.body.should.be.a('Array');
              res.body.should.have.property(0);
              done();
          }).catch(function (err) {
              return Promise.reject(err);
    })

  })

  var forthdata = {    
              name: "bharat",
              card_number: "4837 2178 3259 8214 ",
              balance:0
          };
  // If limit is missing 
  it('While limit fields is missing.', (done) => {

      chai.request(server)
          .post('/api/crud/create')
          .send(forthdata)
          .then((res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('limit');
              done();
          }).catch(function (err) {
              return Promise.reject(err);
    })

  })


 })