import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

//import modelu danych
import { SpecialistElement } from '../../model/specialist.model'

@Component({
  selector: 'app-edit-specialist-dialog',
  templateUrl: './edit-specialist-dialog.component.html',
  styleUrls: ['./edit-specialist-dialog.component.scss']
})
export class EditSpecialistDialogComponent implements OnInit {

  specializationList: string[] = [
    'Alergologia',
    'Dermatologia',
    'Endokrynologia',
    'Kardiochirurgia',
    'Okulistyka',
    'Onkologia',
    'Ortopedia',
    'Pediatria',
    'Psychiatria',
  ];

  constructor(
    public dialogRef: MatDialogRef<EditSpecialistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SpecialistElement,
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
