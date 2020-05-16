import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Patient } from './patient';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private serverUrl = 'http://localhost:3000'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.serverUrl}/patient/`).pipe(
      catchError(this.handleError<[]>('getPatients', []))
    );;
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.serverUrl}/patient/${id}`).pipe(
      catchError(this.handleError<Patient>(`getPatient id=${id}`))
    );
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.serverUrl}/patient/`, patient, this.httpOptions).pipe(
      catchError(this.handleError<Patient>('addPatient'))
    );
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.serverUrl}/patient/${patient._id}`, patient, this.httpOptions).pipe(
      catchError(this.handleError<Patient>('updatePatient'))
    );
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.serverUrl}/patient/${id}`).pipe(
      catchError(this.handleError<Observable<any>>(`deletePatient id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
