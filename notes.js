1. npm install -g express-generator

2. express newProject // this generates new project but use the following command instead

// express --view ejs awesome-answers-express-feb-2017

3. type 'yarn' in command to install yarn

4. go to gitignore.io and create gitignore file
// add node and macOS and press create

5. git push your file

6. install nodemon

// yarn add -D nodemon
go to package.json and change
// "start": "nodemon ./bin/www"
// "debug": "nodemon --inspect ./bin/www"

7. go to bin/ wwww/ and change

// var port = normalizePort(process.env.PORT || '3333');

8. in terminal use 'yarn start'

and go to localhost:3333 to double check everything is running

9.------------------------- Sequelize Library ---------------------------------

// yarn add sequelize
// yarn add pg pg-hstore
// yarn add sequelize-cli

10. if typing 'sequelize' in terminal returns command not found, use

// npm install -g sequelize-cli

11. to setup use the following commands

run in terminal // sequelize init


12. ---------config and create databse -----------------------------------------

go to config/ config.json and change :

/*
{
  "development": {
    "database": "aae_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "aae_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "aae_prod",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
*/

13. go to terminal and run the following command to create database :

// createdb aae_dev
// dropdb aae_dev

or run

// dropdb --echo aae_dev

14. go to package.json and add

"db:create": "createdb --echo aae_dev",
"db:drop": "dropdb --echo aae_dev"

so we can run the command in the terminal:

yarn db:create
yarn db:drop

15. ------------------Create Models and Migrate--------------------------------

go to terminal and run :

// sequelize model:create --name Question --attributes title:string,description:text

you can check if the commands works by running :

// ls models
// ls migrations

if your database is up run, 'sequelize db:migrate' in terminal.
if everything works, db:migrate should run without any errors

/*------------------------------------------------------------------------------
if you run into 'install pg module manually'
npm install -g pg
-------------------------------------------------------------------------------*/

16. To check database :

run in terminal:
// psql -d aae_dev
then
// \d
or
// \d "Questions";
it will show the database content

to exit:
// \q

-------------------------------To roll back migrate----------------------------
/*
sequelize db:migrate:undo
sequelize db:migrate
*/
17. --------------------------SEED QUESTIONS -----------------------------------

go to terminal and run :

// sequelize seed:create --name seed-questions

18. go to seeders > seed-questions.js and add at the top below the first line :

// const M =require('../models/index');
// const Question = M.Question;

19. ----------- ADD FAKER JS------------------------------

go to terminal and run :
// yarn add faker

20.  go to seeders > seed-questions.js and add the top line:

// const faker = require('faker');

21. then add the following to the seed-questions.js:

// return Question.create({title: 'Bob', description: 'Stuff'})

--------*EVERYTHING SEQUELIZE DOES RETURNS A PROMISE*-----------------

then run

// sequelize db:seed:all

then go to "psql -d aae_dev"

and run

// SELECT * FROM "Questions";

it should return a table with the question seeded

22. in seeders > seed-question.js, add :
/*
const questions = Array
  .from({length: 100})
  .map(function() {
    return Question.create({title: `${faker.hacker.adjective()} ${facker.hacker.noun()}` ,
    description: faker.hacker.phrase()
    })
  });
*/

and ---------- in up: (add)----------- :

// return Promise.all(questions);

then run :

// sequelize db:seed:all

23. -------------------DISPLAYING QUESTIONS AND ADDING ROUTES-------------------

create a new file in routes called 'questions.js'

then add the following to questions.js :

/*

const express = require('express');
const router = express.Router();

router.get('/', function (request, response, next) {
  response.send('Stuff');
})

module.exports = router;


*/


24. go to app.js and add:

// const questions = require('./routes/questions');

and

// app.use('/questions', questions);

25. go to question.js and add:

// const Question = require('../models/index').Question;
or
//const {Question} = require('../models/index');


26. in question.js add :

/*

router.get('/', function (request, response, next) {
  Question
  .findAll()
  .then (function (questions) {
    response.send(questions);
  });
})

*/

27. create a 'partial' folder in views folder, then create 'footer.ejs' and 'header.ejs' in the partial folder

28. copy the html format from index.ejs to header.ejs

copy to header.ejs :

/*
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
*/

copy to index.ejs

/*

<%- include('./partials/header') %>
    <h1>Awesome Answers</h1>
<%- include('./partials/footer') %>


*/

copy to footer.ejs

/*
</body>
</html>
*/

29. create a folder 'questions' in views folder and create a file 'index.ejs' in that folder:

then copy to index.ejs:

/*

<%- include('../partials/header') %>
    <h1>Awesome Answers</h1>
<%- include('../partials/footer') %>

*/

30. go to routes folder > questions.js and add :

/*

router.get('/', function (request, response, next) {
  Question
  .findAll()
  .then (function (questions) {
    // the path of the template that response.render takes
    // is relative to the view/ folder by default
    response.render('questions/index', {questions: questions});
    //the second argument passed to reponse.render is an
    // object where all its properties will be available to
    // the rendered template as variables
  });
  // All sequelize query methods return a promise
})

*/

31. go to index.ejs in questions folder and add :

/*

<%- include('../partials/header') %>
    <h1>Questions</h1>
    <ul class="questions-list">
    <% for (let question of questions) { %>
      <li><%= question.title %></li>
    <% } %>
    </ul>
<%- include('../partials/footer') %>

*/

and go to header.ejs to remove "<% title %>" and change it to your desire title name
