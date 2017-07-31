var express = require("express"); 
var bodyParser = require("body-parser"); 
var exphbs = require("express-handlebars"); 
var methodOverride = require("method-override"); 

var PORT = process.env.PORT || 8000; 

var app = express(); 

var db = require("./models");

app.use(express.static("public")); 

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

var routes = require("./controllers/burger_controller.js");

app.use("/", routes);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});