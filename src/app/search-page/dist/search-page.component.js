"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchPageComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var appointment_dialog_component_1 = require("./appointment-dialog/appointment-dialog.component");
var error_dialog_component_1 = require("../error-dialog/error-dialog.component");
var SearchPageComponent = /** @class */ (function () {
    function SearchPageComponent(loginStatusService, searchService, fb, router, dialog) {
        this.loginStatusService = loginStatusService;
        this.searchService = searchService;
        this.router = router;
        this.dialog = dialog;
        this.selected = new forms_1.FormControl(0);
        this.DATA = {};
        this.dateList = [];
        this.range = new forms_1.FormGroup({
            start: new forms_1.FormControl(),
            end: new forms_1.FormControl()
        });
        // specialization = new FormControl();
        // city = new FormControl();
        // time = new FormControl();
        // timeStart = new FormControl();
        // timeEnd = new FormControl();
        // dateStart = new FormControl();
        // dateEnd = new FormControl();
        this.cityList = [
            'Kraków',
            'Warszawa',
            'Poznań',
            'Gdańsk',
            'Wrocław',
            'Zakopane',
        ];
        this.specializationList = [
            'Laryngolog',
            'Kardiolog',
            'Foniatra',
            'Anestezjolog',
            'Ortopeda',
            'Dermatolog',
            'Endokrynolog',
            'Neurolog',
        ];
        this.timeList = [];
        this.form = fb.group({
            city: '',
            specialization: '',
            timeStart: '',
            timeEnd: '',
            dateStart: '',
            dateEnd: ''
        });
    }
    SearchPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.login_status = this.loginStatusService.login_status;
        this.role = this.loginStatusService.role;
        this.ID = this.loginStatusService.ID;
        this.calculateTime();
        if (this.searchService.data == undefined) {
            this.searchService.data = this.form.value;
        }
        this.searchService.findVisit().subscribe(function (data) {
            _this.dateList.length = 0;
            _this.DATA = {};
            data.day.forEach(function (day) {
                var date = new Date(day.date).toLocaleDateString();
                if (!_this.dateList.includes(date)) {
                    _this.dateList.push(date);
                }
                if (!_this.DATA[date]) {
                    _this.DATA[date] = [];
                }
                _this.DATA[date].push({
                    appointmentId: day._id,
                    date: day.date,
                    hour: day.hour,
                    doctor_name: data.doctors[day.doctorId].name,
                    doctor_surname: data.doctors[day.doctorId].surname,
                    city: data.doctors[day.doctorId].city,
                    specialization: data.doctors[day.doctorId].specialization,
                    description: data.doctors[day.doctorId].description
                });
            });
        });
    };
    SearchPageComponent.prototype.calculateTime = function () {
        for (var i = 0; i < 24; i++) {
            if (i < 10) {
                this.timeList.push("0" + i + ":00");
                this.timeList.push("0" + i + ":30");
            }
            else {
                this.timeList.push(i + ":00");
                this.timeList.push(i + ":30");
            }
        }
    };
    SearchPageComponent.prototype.sendData = function () {
        this.searchService.data = this.form.value;
        this.ngOnInit();
    };
    SearchPageComponent.prototype.logout = function () {
        this.loginStatusService.change_status();
        this.ngOnInit();
    };
    SearchPageComponent.prototype.makeAppointment = function (appointment) {
        var _this = this;
        if (this.ID == '') {
            var dialogRef = this.dialog.open(error_dialog_component_1.ErrorDialogComponent, {
                width: '400px',
                data: { text: "Zaloguj się!" }
            });
            dialogRef.afterClosed().subscribe();
        }
        else {
            var dialogRef = this.dialog.open(appointment_dialog_component_1.AppointmentDialogComponent, {
                width: '700px',
                height: '400px',
                data: { appointment: appointment, id: this.ID }
            });
            dialogRef.afterClosed().subscribe(function () {
                _this.ngOnInit();
            });
        }
    };
    SearchPageComponent = __decorate([
        core_1.Component({
            selector: 'app-search-page',
            templateUrl: './search-page.component.html',
            styleUrls: ['./search-page.component.scss']
        })
    ], SearchPageComponent);
    return SearchPageComponent;
}());
exports.SearchPageComponent = SearchPageComponent;
