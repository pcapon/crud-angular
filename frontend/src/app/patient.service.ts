import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private serverUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getPatients(): Observable<[]> {
    return this.http.get<[]>(`${this.serverUrl}/patient/`).pipe(
      catchError(this.handleError<[]>('getPatients', []))
    );;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
