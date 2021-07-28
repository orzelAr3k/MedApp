import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddSpecialistDialogComponent } from './add-specialist-dialog/add-specialist-dialog.component';
import { EditSpecialistDialogComponent } from './edit-specialist-dialog/edit-specialist-dialog.component';
import { LoginStatusService } from './../services/login-status.service';

//import modelu danych
import { SpecialistElement } from '../model/specialist.model';

//servisy
import { SpecialistsService } from '../services/specialists.service';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-admin-shell',
  templateUrl: './admin-shell.component.html',
  styleUrls: ['./admin-shell.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AdminShellComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private specialistService: SpecialistsService,
    private loginStatusService: LoginStatusService
  ) {}

  dataSource!: MatTableDataSource<SpecialistElement>;
  columnsToDisplay = ['Nazwisko', 'Imię', 'Specjalizacja'];
  columnsOfObject = ['surname', 'name', 'specialization'];
  expandedElement!: SpecialistElement | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.specialistService.getListOfSpecialists().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Dodanie nowego specjalisty
  addSpecialist() {
    const dialogRef = this.dialog.open(AddSpecialistDialogComponent, {
      width: '600px',
      height: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.specialistService.addNewSpecialists(result).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  // Usuniecie specjalisty
  deleteSpecialist(element: SpecialistElement) {
    this.specialistService.deleteSpecialist(element._id).subscribe(() => {
      this.ngOnInit()
    })
  }

  // Edycja specjalisty
  editSpecialist(element: SpecialistElement) {
    const dialogRef = this.dialog.open(EditSpecialistDialogComponent, {
      width: '300px',
      data: {
        name: element.name,
        surname: element.surname,
        specialization: element.specialization,
        description: element.description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.specialistService.changeSpecialists(result, element._id).subscribe(() => {
          this.ngOnInit()
        })
      }
    });
  }


  logout() {
    this.loginStatusService.change_status();
    this.ngOnInit();
  }
}