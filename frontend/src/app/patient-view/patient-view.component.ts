import { Component, OnInit, Inject } from '@angular/core';

import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  lastName: '',
  firstName: '',
  age: '',
  sex: ''
}

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {
  patients: Patient[];

  constructor(private patientService: PatientService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(patients => this.patients = patients);
  }
  openDialog() {
    const dialogRef = this.dialog.open(PatientAddDialog, {
      data: {
        lastName: '',
        firstName: '',
        age: '',
        sex: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}

@Component({
  selector: 'patient-add-dialog',
  templateUrl: 'patient-add-dialog.component.html',
})
export class PatientAddDialog {
  constructor(public dialogRef: MatDialogRef<PatientAddDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}