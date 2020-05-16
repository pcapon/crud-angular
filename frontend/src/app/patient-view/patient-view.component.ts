import { Component, OnInit, Inject } from '@angular/core';

import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { Drug } from '../drug';
import { DrugService } from '../drug.service';
import { Treatment } from '../treatment';
import { TreatmentService } from '../treatment.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';

export interface DialogData {
  form: {
    firstName: string;
    lastName: string;
    age: string;
    sex: string;
    drugs: string[];
    treatments: string[];
  }
  autocompleteValues: {
    drugs: Observable<Drug[]>,
    treatments: Observable<Treatment[]>
  }
}

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {
  patients: Patient[];
  drugs: Drug[];

  constructor(
    private patientService: PatientService,
    private drugService: DrugService,
    private treatmentService: TreatmentService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(patients => this.patients = patients);
  }
  openDialog(patient) {
    console.log(patient?.sex);
    const drugs = this.drugService.getDrugs();
    const treatments = this.treatmentService.getTreatments();
    const dialogRef = this.dialog.open(PatientAddDialog, {
      data: {
        form: {
          lastName: patient?.lastName || '',
          firstName: patient?.firstName || '',
          age: patient?.age || '',
          sex: patient?.sex || '',
          drugs: patient?.drugs.map(x => x._id) || [],
          treatments: patient?.treatments.map(x => x._id) || []
        },
        autocompleteValues: {
          drugs: drugs,
          treatments: treatments
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const finalPatient = {
          _id: patient?._id || null,
          lastName: result.lastName.trim(),
          firstName: result.firstName.trim(),
          age: result.age,
          sex: result.sex,
          drugs: result.drugs,
          treatments: result.treatments
        };
        if (patient) {
          this.patientService.updatePatient(finalPatient as Patient).subscribe(patientRet => {
            this.getPatients();
          });
        }
        else {
          this.patientService.addPatient(finalPatient as Patient).subscribe(patientRet => {
            console.log(patientRet);
            this.patients.push(patientRet);
          });
        }
      }
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