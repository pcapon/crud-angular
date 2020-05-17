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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
