const db = require('./mongo').db;

// Kolekcje bazy danych
const Specialists = db.collection("Specialists");
const Users = db.collection("Users");
const Timetable = db.collection("Timetable");

module.exports = { Specialists, Users, Timetable }