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
        console.log(result);
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