const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const app = express();

app.set( 'port', ( process.env.PORT || 5000 ));

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

require('./routes/htmlRoutes.js')
require('./routes/apiRoutes.js')(app)

app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });
