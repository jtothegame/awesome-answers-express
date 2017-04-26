const express = require('express');
const router = express.Router();

const Question = require('../models/index').Question;
// const {Question} = require('../models/index');  <-- can also use this it's called 'destructuring' and is more common.

router.get('/', function (request, response, next) {
  Question
    .findAll() // this returns a promise...
    .then(function (questions) { // allowing us to use .then
      // the path of the template that response.render takes is relative to the view/ folder by default
      response.render('questions/index', {questions: questions});
      // the second argument passed to response.render is an object where all its properties will be available to the rendered template as variables.
    });
    // All Sequelize query methods return a promise **
})

router.get('/:id', function (req, res) {
  const id = req.params.id;

  Question
    .findById(id)
    .then(function (question) {
      res.render('questions/show', {question: question})
  })
})

module.exports = router;
