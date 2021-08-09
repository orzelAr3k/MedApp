import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SpecializationService } from 'src/app/services/specialization.service';
@Component({
  selector: 'app-edit-specialist-dialog',
  templateUrl: './edit-specialist-dialog.component.html',
  styleUrls: ['./edit-specialist-dialog.component.scss']
})
export class EditSpecialistDialogComponent implements OnInit {

  specializationList!: string[];
  spec!: string;

  constructor(
    private specializationService: SpecializationService,
    public dialogRef: MatDialogRef<EditSpecialistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SpecialistElement,
  ) { }

  ngOnInit(): void {
    this.specializationService.getSpecializations().subscribe(specializationList => {
      this.specializationList = specializationList;
    })
  }

  onNoClick() {
    this.dialogRef.close();
  }

  addSpecialization() {
    if (this.spec !== "") {
      this.specializationService.addSpecialization(this.spec).subscribe((result) => {
        if (result) {
          this.ngOnInit();
        }
      });
      this.spec = "";
    }
  }
}
