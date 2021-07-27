"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var express = require("express");

var router = express.Router();

var _require = require("../db/collections"),
    Specialists = _require.Specialists,
    Users = _require.Users,
    Timetable = _require.Timetable;

var _require2 = require("mongodb"),
    ObjectId = _require2.ObjectId;

router.get("", function _callee(req, res) {
  var city, specialization, timeStart, timeEnd, dateStart, dateEnd, _ref, _ref2, doctorIds, doctors, find;

  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          city = req.query.city;
          specialization = req.query.specialization;
          timeStart = req.query.timeStart;
          timeEnd = req.query.timeEnd;
          dateStart = req.query.dateStart;
          dateEnd = req.query.dateEnd;

          doctor = function doctor(city, specialization) {
            var query_doctor;
            return regeneratorRuntime.async(function doctor$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    query_doctor = {};

                    if (_typeof(city) == _typeof("")) {
                      city != '' ? query_doctor.city = city : "";
                    } else {
                      city != '' ? query_doctor.city = {
                        $in: city
                      } : "";
                    }

                    specialization != "" ? query_doctor.specialization = specialization : "";
                    return _context.abrupt("return", Specialists.find(query_doctor).toArray().then(function (specialists) {
                      var doctorIds = [];
                      var doctors = {};
                      specialists.forEach(function (elem) {
                        if (!doctorIds.includes(elem._id)) {
                          doctorIds.push(elem._id.toString());
                          doctors[elem._id.toString()] = {
                            name: elem.name,
                            surname: elem.surname,
                            city: elem.city,
                            description: elem.description,
                            specialization: elem.specialization
                          };
                        }
                      });
                      return [doctorIds, doctors];
                    }));

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          _context2.next = 9;
          return regeneratorRuntime.awrap(doctor(city, specialization));

        case 9:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 2);
          doctorIds = _ref2[0];
          doctors = _ref2[1];
          find = {
            doctorId: {
              $in: doctorIds
            },
            date: {
              $gte: new Date()
            },
            patient: ""
          };

          if (dateStart != "" && dateEnd != "") {
            find.date = {
              $gte: new Date(dateStart),
              $lte: new Date(dateEnd).addHours(24)
            };
          } else if (dateStart != "" && dateEnd == "") {
            find.date = {
              $gte: new Date(dateStart)
            };
          } else if (dateStart == "" && dateEnd != "") {
            find.date = {
              $lte: new Date(dateEnd).addHours(24)
            };
          }

          if (timeStart != "" && timeEnd != "") {
            find.hour = {
              $gte: timeStart,
              $lte: timeEnd
            };
          } else if (timeStart != "" && timeEnd == "") {
            find.hour = {
              $gte: timeStart
            };
          } else if (timeStart == "" && timeEnd != "") {
            find.hour = {
              $lte: timeEnd
            };
          }

          Timetable.find(find).sort({
            date: 1
          }).toArray(function (error, result) {
            res.send({
              day: result,
              doctors: doctors
            });
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.patch("", function _callee2(req, res) {
  var appointmentId, patientId, description, patient, patientName;
  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          appointmentId = req.body.payload.appointmentId;
          patientId = req.body.payload.patientId;
          description = req.body.payload.description;

          patient = function patient(id) {
            return regeneratorRuntime.async(function patient$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", Users.findOne({
                      _id: ObjectId(id)
                    }).then(function (patient) {
                      return [patient.name, patient.surname];
                    }));

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          };

          _context4.next = 6;
          return regeneratorRuntime.awrap(patient(patientId));

        case 6:
          patientName = _context4.sent;
          Timetable.updateOne({
            _id: ObjectId(appointmentId)
          }, {
            $set: {
              patient: patientName.join(" "),
              patientId: patientId,
              description: description
            }
          }, function (error, result) {
            if (error) throw error;
          });

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;