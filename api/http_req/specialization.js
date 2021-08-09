const express = require("express");
const router = express.Router();
const { Specializations } = require("../db/collections");

router.get("", (req, res) => {
  const SpecializationList = [];

  Specializations.find({})
    .sort({ specialization: 1 })
    .toArray((error, result) => {
      if (error) throw error;
      result.forEach((item) => {
        SpecializationList.push(item.specialization);
      });
      res.send(SpecializationList);
    });
});

router.post("", (req, res) => {
  Specializations.updateOne(
    { specialization: req.body.payload },
    { $setOnInsert: { specialization: req.body.payload } },
    { upsert: true }
  );
  res.send({text: "Added successfuly!"});
});

module.exports = router;
