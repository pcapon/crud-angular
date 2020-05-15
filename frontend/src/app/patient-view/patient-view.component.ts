import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {
  patients: [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(): void {
    this.http.get<[]>('http://localhost:3000/patient/').subscribe(data => this.patients = data);
  }

}
