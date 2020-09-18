const express = require('express');

const app = express();
const userRoutes = require('./routes/user');

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

app.use(express.json({limit:'1mb'}));
app.use('/api/auth',  userRoutes);

module.exports = app;
