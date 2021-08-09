const { ɵangular_packages_router_router_b } = require("@angular/router");
const express = require("express");
const router = express.Router();
const { Cities } = require("../db/collections");

router.get("", (req, res) => {
  const CitiesList = [];
  Cities.find({})
    .sort({ city: 1 })
    .toArray((error, result) => {
      if (error) throw error;
      result.forEach((item) => {
        CitiesList.push(item.city);
      });
      res.send(CitiesList);
    });
});

router.post("", (req, res) => {
  Cities.updateOne(
    { city: req.body.payload },
    { $setOnInsert: { city: req.body.payload } },
    { upsert: true }
  );
  res.send({ text: "Added successfuly!" });
});

module.exports = router;
