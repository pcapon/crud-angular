import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Drug } from './drug';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  private serverUrl = 'http://localhost:3000'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getDrugs(): Observable<Drug[]> {
    return this.http.get<Drug[]>(`${this.serverUrl}/drug/`).pipe(
      catchError(this.handleError<Drug[]>('getDrugs', []))
    );;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
