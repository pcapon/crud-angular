import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private serverUrl = 'http://localhost:3000'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.serverUrl}/doctor/`).pipe(
      catchError(this.handleError<Doctor[]>('getDoctors', []))
    );;
  }

  getFull() {
    return this.http.get(`${this.serverUrl}/doctor/full`).pipe(
      catchError(this.handleError('getFull', []))
    );;
  }

  addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.serverUrl}/doctor/`, doctor, this.httpOptions).pipe(
      catchError(this.handleError<Doctor>('addDoctor'))
    );
  }

  updateDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.serverUrl}/doctor/${doctor._id}`, doctor, this.httpOptions).pipe(
      catchError(this.handleError<Doctor>('updateDoctor'))
    );
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}/doctor/${id}`).pipe(
      catchError(this.handleError<Observable<any>>(`deleteDoctor id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
