const db = require("./mongo").db;

// Kolekcje bazy danych
const Specialists = db.collection("Specialists");
const Users = db.collection("Users");
const Timetable = db.collection("Timetable");
const Specializations = db.collection("Specializations");
const Cities = db.collection("Cities");

module.exports = { Specialists, Users, Timetable, Specializations, Cities };
