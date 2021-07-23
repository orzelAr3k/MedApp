const express = require("express");
const app = express();
const { db } = require("./db/mongo");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");

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
  if (time_start === time_end) return [time_start];
  else {
    let timeList = [];
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        timeList.push(`0${i}:00`);
        timeList.push(`0${i}:30`);
      } else {
        timeList.push(`${i}:00`);
        timeList.push(`${i}:30`);
      }
    }
    const index_start = timeList.indexOf(time_start);
    const index_end = timeList.indexOf(time_end);
    return timeList.slice(index_start, index_end + 1);
  }
}

function calculateDate(date_start, date_end) {
  if (date_start === date_end) return [date_start];
  else {
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
    .collation({ locale: "en", numericOrdering: true })
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
  dateList = calculateDate(date_start, date_end);

  dateList.forEach((date) => {
    timeList.forEach((time) => {
      t = time.split(":");
      d = date;
      d.setHours(parseInt(t[0]) + 2, parseInt(t[1]));
      Timetable.updateOne(
        { doctorId: doctorId, date: new Date(d), hour: time },
        {
          $setOnInsert: {
            doctorId: doctorId,
            patientId: "",
            date: new Date(d),
            hour: time,
            patient: "",
            description: "",
          },
        },
        { upsert: true }
      );
    });
  });
  res.send({ info: "done" });
});

app.delete("/timetable", async (req, res) => {
  const doctorId = req.query.id;
  const date = req.body.payload.date;
  const hour = req.body.payload.hour;

  Timetable.deleteOne(
    { doctorId: doctorId, date: new Date(date), hour: hour },
    (error, result) => {
      if (error) throw error;
      res.send(result);
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

  doctor = async (city, specialization) => {
    const query_doctor = {};
    city != "null" && typeof city != "string"
      ? (query_doctor.city = { $in: city })
      : "";
    city != "null" && typeof city == "string" ? (query_doctor.city = city) : "";
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

app.patch("/search", async (req, res) => {
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

// ========================= doctor =================================

app.get("/doctor", (req, res) => {
  const id = req.query.id;

  Timetable.find({ doctorId: id, patient: { $ne: "" }, date: { $gte: new Date() } })
    .sort({ date: 1 })
    .toArray((err, result) => {
      res.send(result);
    });
});

app.patch('/doctor', (req, res) => {
  const id = req.body.payload;

  Timetable.updateOne( {_id: ObjectId(id)}, { $set: { patient: "", patientId: "", description: "" } })
  res.send({info: "done"})
})

// ==================== auth ==========================================

app.post("/auth/login", async (req, res) => {
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
