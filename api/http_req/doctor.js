const express = require("express");
const router = express.Router();
const { Specialists, Users, Timetable } = require("../db/collections");
const { ObjectId } = require("mongodb");

router.get('', (req, res) => {
  const id = req.query.id;

  Timetable.find({
    doctorId: id,
    patient: { $ne: "" },
    date: { $gte: new Date() },
  })
    .sort({ date: 1 })
    .toArray((error, result) => {
      if (error) throw error;
      res.send(result);
    });
});

router.patch('', (req, res) => {
  const id = req.body.payload;

  Timetable.updateOne(
    { _id: ObjectId(id) },
    { $set: { patient: "", patientId: "", description: "" } }
  );
  res.send({ info: "done" });
});

module.exports = router;