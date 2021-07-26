const express = require("express");
const router = express.Router();
const { Specialists, Users, Timetable } = require("../db/collections");

router.post('/login', async (req, res) => {
    const email = req.body.payload.email;
    const password = req.body.payload.password;
  
    doctor = async (email, password) => {
      return Specialists.findOne({ email: email, password: password }).then(
        (specialist) => {
          if (specialist)
            return {
              info: true,
              doctorId: specialist._id,
              email: specialist.email,
              person: specialist.person,
            };
        }
      );
    };
  
    patient = async (email, password) => {
      return Users.findOne({ email: email, password: password }).then((user) => {
        if (user)
          return {
            info: true,
            patientId: user._id,
            email: user.email,
            person: user.person,
          };
      });
    };
  
    if ((await patient(email, password)) != undefined) {
      res.send(await patient(email, password));
    } else if ((await doctor(email, password)) != undefined) {
      res.send(await doctor(email, password));
    } else {
      res.send({ info: false });
    }
  });
  
router.post('/signup', (req, res) => {
    const name = req.body.payload.name;
    const surname = req.body.payload.surname;
    const email = req.body.payload.email;
    const password = req.body.payload.password;
  
    Users.findOne({ email: email }, (error, user) => {
      if (error) throw error;
      if (user) {
        console.log("Użytkownik już istnieje!");
        res.sendStatus(409);
      } else {
        console.log("Utworzono użytkownika");
        Users.insertOne(
          {
            name: name,
            surname: surname,
            email: email,
            password: password,
            person: "patient",
          },
          (error, user) => {
            if (error) throw error;
            res.send(user);
          }
        );
      }
    });
  });

  module.exports = router;