import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecialistDialogComponent } from './edit-specialist-dialog.component';

describe('EditSpecjalistDialogComponent', () => {
  let component: EditSpecialistDialogComponent;
  let fixture: ComponentFixture<EditSpecialistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpecialistDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpecialistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
