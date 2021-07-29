const express = require("express");
const router = express.Router();
const { Specialists, Users, Timetable } = require("../db/collections");
const { ObjectId } = require("mongodb");


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

router.get('', async (req, res) => {
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

router.post('', async (req, res) => {
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

router.delete('', async (req, res) => {
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

module.exports = router;
