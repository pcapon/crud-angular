import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { Drug } from '../drug';
import { DrugService } from '../drug.service';
import { Treatment } from '../treatment';
import { TreatmentService } from '../treatment.service';

@Component({
  selector: 'app-patient-detail-view',
  templateUrl: './patient-detail-view.component.html',
  styleUrls: ['./patient-detail-view.component.scss']
})
export class PatientDetailViewComponent implements OnInit {
  displayedColumns: string[] = ['text', 'start', 'end', 'doctor'];
  dataSource: MatTableDataSource<Treatment>;

  patient: Patient;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
  ) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.patientService.getPatient(id)
      .subscribe(patient => { 
        console.log(patient);
        this.patient = patient 
        this.dataSource = new MatTableDataSource<Treatment>(this.patient.treatments);
      });
  }

}
