const express = require("express");
const router = express.Router();
const { Specialists, Users, Timetable } = require("../db/collections");
const { ObjectId } = require("mongodb");


router.get('', (req, res) => {
  Specialists.find({})
    .collation({ locale: "en" })
    .sort({ surname: 1 })
    .toArray((error, specialist) => {
      if (error) throw error;
      res.send(specialist);
    });
});

router.post('', (req, res) => {
  const name = req.body.payload.name;
  const surname = req.body.payload.surname;
  const specialization = req.body.payload.specialization;
  const description = req.body.payload.description;
  const city = req.body.payload.city;
  const email = req.body.payload.email;
  const password = req.body.payload.password;
  Specialists.insertOne(
    {
      name: name,
      surname: surname,
      specialization: specialization,
      description: description,
      city: city,
      email: email,
      password: password,
      person: "doctor",
    },
    (error, specialist) => {
      if (error) throw error;
      res.send(specialist);
    }
  );
});

router.patch('', (req, res) => {
  const id = req.query.id;
  const name = req.body.payload.name;
  const surname = req.body.payload.surname;
  const specialization = req.body.payload.specialization;
  const description = req.body.payload.description;

  Specialists.updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        name: name,
        surname: surname,
        specialization: specialization,
        description: description,
      },
    },
    (error, specialist) => {
      if (error) throw error;
      res.send(specialist);
    }
  );
});

router.delete('', (req, res) => {
  const id = req.query.id;

  Specialists.deleteOne({ _id: ObjectId(id) }, (error, specialist) => {
    if (error) throw error;
    res.send(specialist);
    Timetable.deleteMany({ doctorId: id });
  });
});

module.exports = router;
