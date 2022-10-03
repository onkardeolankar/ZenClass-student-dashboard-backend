let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let createError = require('http-errors');

const db = require('./database/connection');
const studentRoute = require('./routes/student.route')

// Connecting mongoDB Database
db.connection(); 

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// PORT
const port = process.env.PORT || 8010;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Express Route
app.get('/', function(req,res){
  res.send("Welcome to the Zen Class Student Dashboard");
});
app.use('/students', studentRoute);

// 404 Error
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

app.use(function (err, req, res, next) {
  next(createError(500, 'Internal Server Error'));
  if (!err.statusCode) err.statusCode = 500;
  return res.status(err.statusCode).send(err.message);
});
