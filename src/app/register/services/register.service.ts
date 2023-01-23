import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { User } from 'src/app/shared/common/types';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  // Node.js Express API
  REST_API: string = 'http://localhost:8000/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  register(user: User) {
    const API_URL = `${this.REST_API}/add-user`;

    return this.http.post(API_URL, user).pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status} Message: ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
