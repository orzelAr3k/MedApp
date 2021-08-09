const express = require("express");
const router = express.Router();
const { Specialists, Users, Timetable } = require("../db/collections");
const { ObjectId } = require("mongodb");


router.get("", (req, res) => {
  const id = req.query.id;

  const doctor = async (ids) => {
    const doctorName = {};
    return Specialists.find({ _id: { $in: ids } })
      .toArray()
      .then((specialists) => {
        specialists.forEach((elem) => {
          if (!doctorName[elem._id])
            doctorName[elem._id] = {
              name: [elem.name, elem.surname].join(" "),
              city: elem.city,
            };
        });
        return doctorName;
      });
  };

  Timetable.find({ patientId: id, date: { $gte: new Date() }})
    .sort({ date: 1 })
    .toArray(async (error, appointment) => {
      if (error) throw error;
      const doctorIds = [];
      appointment.forEach((elem) => {
        doctorIds.push(ObjectId(elem.doctorId));
      });
      const doctorName = await doctor(doctorIds);
      res.send({ appointment, doctorName });
    });
});

router.patch("", (req, res) => {
  const id = req.body.payload;

  Timetable.updateOne(
    { _id: ObjectId(id) },
    { $set: { patient: "", patientId: "", description: "" } }
  );
  res.send({ info: "done" });
});

module.exports = router;
