const express = require("express");
const app = express();
const { db } = require("./db/mongo");
const bodyParser = require("body-parser");
const { ObjectId, Data } = require("mongodb");

const PORT = 3000;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(bodyParser.json());

// Funkcje pomocnicze

function calculateTime(time_start, time_end) {
  let timeList = [];
  for (let i = 0; i < 24; i++) {
    timeList.push(`${i}:00`);
    timeList.push(`${i}:30`);
  }
  const index_start = timeList.indexOf(time_start);
  const index_end = timeList.indexOf(time_end);
  return timeList.slice(index_start, index_end + 1);
}

function calculateDate(date_start, date_end, doctorId) {
  let dateList = [];
  for (
    let d = new Date(date_start).addHours(2);
    d <= new Date(date_end).addHours(2);
    d.setDate(d.getDate() + 1)
  ) {
    dateList.push(new Date(d));
  }
  return dateList;
}

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

// =======================================================

// Kolekcje bazy danych
const Specialists = db.collection("Specialists");
const Users = db.collection("Users");
const Timetable = db.collection("Timetable");


// ======================== shell =======================

app.get("/specialists", (req, res) => {
  Specialists.find({})
    .collation({ locale: "en" })
    .sort({ surname: 1 })
    .toArray((error, specialist) => {
      if (error) throw error;
      res.send(specialist);
    });
});

app.post("/specialists", (req, res) => {
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

app.patch("/specialists", async (req, res) => {
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

app.delete("/specialists", async (req, res) => {
  const id = req.query.id;
  Specialists.deleteOne({ _id: ObjectId(id) }, (error, specialist) => {
    if (error) throw error;
    res.send(specialist);
    Timetable.deleteMany({ doctorId: id });
  });
});

// ===================================================================

app.get("/timetable", async (req, res) => {
  const doctorId = req.query.id;

  doctor = async (id) => {
    return Specialists.findOne({ _id: ObjectId(id) }).then((specialist) => {
      return [specialist.name, specialist.surname];
    });
  };

  let doctorName = await doctor(doctorId);



  Timetable.find({ doctorId: doctorId })
    .sort({ date: 1, hour: 1 })
    .toArray((error, day) => {
      if (error) throw error;
      res.send({
        doctorName: doctorName,
        day,
      });
    });
});

app.post("/timetable", async (req, res) => {
  const doctorId = req.query.id;
  const date_start = req.body.payload.date_start;
  const date_end = req.body.payload.date_end;
  const hour_start = req.body.payload.hour_start;
  const hour_end = req.body.payload.hour_end;

  timeList = calculateTime(hour_start, hour_end);
  dateList = calculateDate(date_start, date_end, doctorId);


  dateList.forEach(date => {
    timeList.forEach(time => {
      Timetable.insertOne({ doctorId: doctorId, patientId: "", date: date, hour: time, patient: "", description: "" })
    })
  })
});

app.delete("/timetable", async (req, res) => {
  const doctorId = req.query.id;
  const date = req.body.payload.date;
  const appointment = req.body.payload.appointment;

  Timetable.updateOne(
    { doctorId: doctorId, date: new Date(date) },
    { $pull: { hours: appointment } },
    (error, result) => {
      if (error) throw error;
      res.send(result);
      Timetable.deleteMany({ doctorId: doctorId, hours: [] });
    }
  );
});

// ===================== search =======================================


app.get("/search", async (req, res) => {
  const city = req.query.city;
  const specialization = req.query.specialization;
  const timeStart = req.query.timeStart;
  const timeEnd = req.query.timeEnd;
  const dateStart = req.query.dateStart;
  const dateEnd = req.query.dateEnd;

  let find = {date: { $gte: new Date() }};

  Timetable.find(find).toArray((error, result) => {
    res.send(result);
  })
})






// ==================== auth ==========================================

app.post("/auth/login", async (req, res) => {
  const email = req.body.payload.email;
  const password = req.body.payload.password;

  doctor = async (email, password) => {
    return Specialists.findOne({ email: email, password: password }).then((specialist) => {
      if (specialist)
      return {info: true, name: specialist.name, surname: specialist.surname, email: specialist.email, person: specialist.person};
    });
  };

  patient = async (email, password) => {
    return Users.findOne({ email: email, password: password }).then((user) => {
      if (user)
      return {info: true, name: user.name, surname: user.surname, email: user.email, person: user.person};
    });
  }

  if (await patient(email, password) != undefined) {
    res.send(await patient(email, password));
  } else if (await specialist(email, password) != undefined) {
    res.send(await specialist(email, password));
  } else {
    res.send({info: false});
  }


  // Users.findOne({ email: email, password: password }, (error, user) => {
  //   if (error) throw error;
  //   console.log(user);
  //   if (user != undefined) {
  //     data.info = true;
  //     data.name = user.name;
  //     data.surname = user.surname;
  //     data.email = user.email;
  //     data.person = user.person;
  //   }
  // });
  // Specialists.findOne({ email: email, password: password }, (error, user) => {
  //   if (error) throw error;
  //   console.log(user);
  //   if (user != undefined) {
  //     res.send({
  //       info: true,
  //       name: user.name,
  //       surname: user.surname,
  //       email: user.email,
  //       person: user.person,
  //     });
  //   }
  // });


  // console.log(data);
  // res.send(data);
});

app.post("/auth/signup", (req, res) => {
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

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
