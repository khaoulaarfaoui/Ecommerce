import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Userdetails} from '../Models/userdetails';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  listDetailUser: Userdetails[];
  private apiServer='http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  create(userdetails): Observable<Userdetails> {
    return this.httpClient.post<Userdetails>(this.apiServer + '/usersDetails/', JSON.stringify(userdetails), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
  }
  getById(id): Observable<Userdetails> {
    return this.httpClient.get<Userdetails>(this.apiServer + '/usersDetails/' + id)
        .pipe(
            catchError(this.errorHandler)
        )
  }

  getAll(): Observable<Userdetails[]> {
    return this.httpClient.get<Userdetails[]>(this.apiServer + '/usersDetails/')
        .pipe(
            catchError(this.errorHandler)
        )
  }

  update(id, userdetails): Observable<Userdetails> {
    return this.httpClient.put<Userdetails>(this.apiServer + '/usersDetails/' + id, JSON.stringify(userdetails), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
  }

  delete(id){
    return this.httpClient.delete<Userdetails>(this.apiServer + '/usersDetails/' + id, this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
  }
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
