var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// connect to the database
// const mysql = require('mysql2');
var mysql = require('mysql');

var dbConn = mysql.createConnection({
  host: 'database-1.cox8a14brcmn.ap-northeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'b08207054',
  port: '3306'
});

dbConn.connect(function (err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// dbConn.end();

/*
Validation Section
*/
const { body, validationResult } = require('express-validator');
// const { body } = require("express-validator");

const userDataValidateChainMethod = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("User name is required")
    .isString()
    .withMessage("User name should be string")
    .matches(/^[\w\d]*$/g)
    .withMessage("User name should contain only contains english alphabet and number"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .matches(/^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[~`! @#$%^&*()_\-+={[}\]|:;"'<,>.?\/|])|(?=.*[a-z])(?=.*[0-9])(?=.*[~`! @#$%^&*()_\-+={[}\]|:;"'<,>.?\/|])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&\/=?_.,:;\\-])).{3,}$/g)
    .withMessage("Password should contain at least three of the four character types"),
  body("email")
    .exists()
    .withMessage("email is required")
    .isEmail().withMessage("Provide valid email"),
];

/*
API Section
*/

// ***Retrieve all users*** 
// app.get('/users', function (req, res) {
//   dbConn.query('SELECT * FROM `assignment`.`user`', function (error, results, fields) {
//     if (error) throw error;
//     return res.send({ "data": results });
//   });
// });

// ***User Qeury API*** 
app.get('/users', function (req, res) {
  let user_id = req.query.id;
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  dbConn.query('SELECT * FROM `assignment`.`user` WHERE id=' + user_id, function (error, results, fields) {
    if (error) {
      return res.status(403).send({ error: true, message: 'User Not Existing' });
    }
    if (results.length === 0) {
      return res.status(403).send({ error: true, message: 'User Not Existing' });
    }
    const user = { "id": results[0]['id'], "name": results[0]['name'], "email": results[0]['email'] };
    return res.send({ data: { user, date: req.header('Request-Date') } });
  });
});

// ***User Sign Up API***  
app.post('/users', userDataValidateChainMethod, function (req, res) {
  // Validate incoming input
  const errors = validationResult(req);
  // if there is error then return Error
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // validate 403
  dbConn.query('SELECT * FROM `assignment`.`user` WHERE email="' + email + '"', function (error, results) {
    if (error) {
      return res.send(error);
    }
    if (results.length > 0) {
      // Already exist 
      return res.status(403).send({ error: true, message: 'Email Already Exists' });
    }
  });


  dbConn.query("INSERT INTO `assignment`.`user` SET ? ", { name: name, email: email, password: password }, function (error, results, fields) {
    if (error) {
      return res.send(error);
    }
    console.log(results)
    const user = { "id": results['insertId'], "name": name, "email": email };
    var datetime = new Date().toUTCString();
    return res.send({ data: { user, date: req.header('Request-Date') } });
  });

});


module.exports = app;
