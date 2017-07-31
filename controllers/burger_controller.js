var express = require("express");

var router = express.Router();

var db = require("../models");
var burger = db.burger;

router.get("/", function(req, res) {
  burger.findAll({
    order: [["burger_name",]],
  }).then(function(result) {
  res.render("index", {burgers: result});
  });
});

router.post("/", function(req, res) {
    burger.create({
      burger_name: req.body.burger_name,
    }).then(function(burg_result) {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
   burger.update({
    devoured: true
  }, {
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect("/");
  });
});

router.delete("/:id", function(req, res) {
    burger.findAll({
    where: {
      devoured: true
    }
  }).then(function(result) {
    result.forEach(function(val) {
      burger.destroy({
        where: {
          id: req.params.id
        }
      });
    });
    res.redirect("/");
  });
});

module.exports = router;