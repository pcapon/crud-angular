import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { Drug } from '../drug';
import { DrugService } from '../drug.service';
import { Treatment } from '../treatment';
import { Doctor } from '../doctor';
import { TreatmentService } from '../treatment.service';
import { DoctorService } from '../doctor.service';

export interface DialogData {
  form: {
    start: string;
    end: string;
    text: string;
    doctor: string;
  }
  autocompleteValues: {
    doctors: Observable<Doctor[]>,
  }
}

export interface DialogDataExist {
  form: {
    treatments: string[];
  }
  autocompleteValues: {
    treatments: Observable<Treatment[]>,
  }
}

export interface DialogDrugExist {
  form: {
    drugs: string[];
  }
  autocompleteValues: {
    drugs: Observable<Drug[]>,
  }
}

export interface DialogDrug {
  form: {
    name: string;
    code: string;
  }
  autocompleteValues: {
    drugs: Observable<Drug[]>,
  }
}

@Component({
  selector: 'app-patient-detail-view',
  templateUrl: './patient-detail-view.component.html',
  styleUrls: ['./patient-detail-view.component.scss']
})
export class PatientDetailViewComponent implements OnInit {
  displayedColumnsTreatments: string[] = ['text', 'start', 'end', 'doctor'];
  displayedColumnsDrugs: string[] = ['name', 'code'];
  dataSourceTreatments: MatTableDataSource<Treatment>;
  dataSourceDrugs: MatTableDataSource<Drug>;

  patient: Patient;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private treatmentService: TreatmentService,
    private drugService: DrugService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.patientService.getPatient(id)
      .subscribe(patient => {
        console.log(patient);
        this.patient = patient
        this.dataSourceTreatments = new MatTableDataSource<Treatment>(this.patient.treatments);
        this.dataSourceDrugs = new MatTableDataSource<Drug>(this.patient.drugs);
      });
  }

  openDialog() {
    const doctors = this.doctorService.getDoctors();
    const dialogRef = this.dialog.open(TreatmentAddDialog, {
      data: {
        form: {
          start: new FormControl((new Date()).toISOString()),
          end: new FormControl((new Date()).toISOString()),
          text: '',
          doctor: ''
        },
        autocompleteValues: {
          doctors: doctors
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.treatmentService.addTreatment(result as Treatment).subscribe((treatment) => {
          const patientUpdate = {
            _id: this.patient?._id,
            lastName: this.patient.lastName,
            firstName: this.patient.firstName,
            age: this.patient.age,
            sex: this.patient.sex,
            drugs: this.patient.drugs.map(x => x._id),
            treatments: this.patient.treatments.map(x => x._id).concat(treatment._id)
          }
          console.log(patientUpdate)
          this.patientService.updatePatient(patientUpdate as Patient).subscribe(() => {
            this.getPatient();
          });
        })
      }
    });
  }

  openExistDialog() {
    const treatments = this.treatmentService.getTreatments();
    const dialogRef = this.dialog.open(TreatmentAddExistDialog, {
      data: {
        form: {
          treatments: this.patient.treatments.map(x => x._id)
        },
        autocompleteValues: {
          treatments: treatments
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const patientUpdate = {
          _id: this.patient?._id,
          lastName: this.patient.lastName,
          firstName: this.patient.firstName,
          age: this.patient.age,
          sex: this.patient.sex,
          drugs: this.patient.drugs.map(x => x._id),
          treatments: this.patient.treatments.map(x => x._id).concat(result.treatments)
        }
        console.log(patientUpdate)
        this.patientService.updatePatient(patientUpdate as Patient).subscribe(() => {
          this.getPatient();
        });
      }
    });
  }

  openDrugExistDialog() {
    const drugs = this.drugService.getDrugs();
    const dialogRef = this.dialog.open(DrugAddExistDialog, {
      data: {
        form: {
          drugs: this.patient.drugs.map(x => x._id)
        },
        autocompleteValues: {
          drugs: drugs
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const patientUpdate = {
          _id: this.patient?._id,
          lastName: this.patient.lastName,
          firstName: this.patient.firstName,
          age: this.patient.age,
          sex: this.patient.sex,
          drugs: this.patient.drugs.map(x => x._id).concat(result.drugs),
          treatments: this.patient.treatments.map(x => x._id)
        }
        console.log(patientUpdate)
        this.patientService.updatePatient(patientUpdate as Patient).subscribe(() => {
          this.getPatient();
        });
      }
    });
  }

  openDrugDialog() {
    const drugs = this.drugService.getDrugs();
    const dialogRef = this.dialog.open(DrugAddDialog, {
      data: {
        form: {
          name: '',
          code: ''
        },
        autocompleteValues: {
          drugs: drugs
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.drugService.addDrug(result as Drug).subscribe((drug) => {
          const patientUpdate = {
            _id: this.patient?._id,
            lastName: this.patient.lastName,
            firstName: this.patient.firstName,
            age: this.patient.age,
            sex: this.patient.sex,
            drugs: this.patient.drugs.map(x => x._id).concat(drug._id),
            treatments: this.patient.treatments.map(x => x._id)
          }
          console.log(patientUpdate)
          this.patientService.updatePatient(patientUpdate as Patient).subscribe(() => {
            this.getPatient();
          });
        })
      }
    });
  }

}



@Component({
  selector: 'treatment-add-dialog',
  templateUrl: 'treatment-add-dialog.component.html',
})
export class TreatmentAddDialog {
  constructor(public dialogRef: MatDialogRef<TreatmentAddDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'treatment-add-exist-dialog',
  templateUrl: 'treatment-add-exist-dialog.component.html',
})
export class TreatmentAddExistDialog {
  constructor(public dialogRef: MatDialogRef<TreatmentAddExistDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogDataExist) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'drug-add-exist-dialog',
  templateUrl: 'drug-add-exist-dialog.component.html',
})
export class DrugAddExistDialog {
  constructor(public dialogRef: MatDialogRef<DrugAddExistDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogDrugExist) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'drug-add-dialog',
  templateUrl: 'drug-add-dialog.component.html',
})
export class DrugAddDialog {
  constructor(public dialogRef: MatDialogRef<DrugAddDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogDrug) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}