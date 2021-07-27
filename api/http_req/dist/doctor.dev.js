"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../db/collections"),
    Specialists = _require.Specialists,
    Users = _require.Users,
    Timetable = _require.Timetable;

var _require2 = require("mongodb"),
    ObjectId = _require2.ObjectId;

router.get('', function (req, res) {
  var id = req.query.id;
  Timetable.find({
    doctorId: id,
    patient: {
      $ne: ""
    },
    date: {
      $gte: new Date()
    }
  }).sort({
    date: 1
  }).toArray(function (error, result) {
    if (error) throw error;
    res.send(result);
  });
});
router.patch('', function (req, res) {
  var id = req.body.payload;
  Timetable.updateOne({
    _id: ObjectId(id)
  }, {
    $set: {
      patient: "",
      patientId: "",
      description: ""
    }
  });
  res.send({
    info: "done"
  });
});
module.exports = router;