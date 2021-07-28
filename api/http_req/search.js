const express = require("express");
const router = express.Router();
const { Specialists, Users, Timetable } = require("../db/collections");
const { ObjectId } = require("mongodb");

router.get("", async (req, res) => {
  const city = req.query.city;
  const specialization = req.query.specialization;
  const timeStart = req.query.timeStart;
  const timeEnd = req.query.timeEnd;
  const dateStart = req.query.dateStart;
  const dateEnd = req.query.dateEnd;

  doctor = async (city, specialization) => {
    let query_doctor = {};

    if( typeof(city) == typeof("")){ 
      city != 'null' ? (query_doctor.city = city) : "";
    } else {
      city != 'null' ? (query_doctor.city = { $in: city }) : "";
    }
    
    specialization != "null"
      ? (query_doctor.specialization = specialization)
      : "";

    return Specialists.find(query_doctor)
      .toArray()
      .then((specialists) => {
        let doctorIds = [];
        let doctors = {};
        specialists.forEach((elem) => {
          if (!doctorIds.includes(elem._id)) {
            doctorIds.push(elem._id.toString());
            doctors[elem._id.toString()] = {
              name: elem.name,
              surname: elem.surname,
              city: elem.city,
              description: elem.description,
              specialization: elem.specialization,
            };
          }
        });
        return [doctorIds, doctors];
      });
  };

  const [doctorIds, doctors] = await doctor(city, specialization);
  let find = {
    doctorId: { $in: doctorIds },
    date: { $gte: new Date() },
    patient: "",
  };

  if (dateStart != "null" && dateEnd != "null") {
    find.date = {
      $gte: new Date(dateStart),
      $lte: new Date(dateEnd).addHours(24),
    };
  } else if (dateStart != "null" && dateEnd == "null") {
    find.date = { $gte: new Date(dateStart) };
  } else if (dateStart == "null" && dateEnd != "null") {
    find.date = { $lte: new Date(dateEnd).addHours(24) };
  }

  if (timeStart != "null" && timeEnd != "null") {
    find.hour = { $gte: timeStart, $lte: timeEnd };
  } else if (timeStart != "null" && timeEnd == "null") {
    find.hour = { $gte: timeStart };
  } else if (timeStart == "null" && timeEnd != "null") {
    find.hour = { $lte: timeEnd };
  }

  Timetable.find(find)
    .sort({ date: 1 })
    .toArray((error, result) => {
      res.send({ day: result, doctors: doctors });
    });
});

router.patch("", async (req, res) => {
  const appointmentId = req.body.payload.appointmentId;
  const patientId = req.body.payload.patientId;
  const description = req.body.payload.description;

  const patient = async (id) => {
    return Users.findOne({ _id: ObjectId(id) }).then((patient) => {
      return [patient.name, patient.surname];
    });
  };

  const patientName = await patient(patientId);

  Timetable.updateOne(
    { _id: ObjectId(appointmentId) },
    {
      $set: {
        patient: patientName.join(" "),
        patientId: patientId,
        description: description,
      },
    },
    (error, result) => {
      if (error) throw error;
    }
  );
});

module.exports = router;
