import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: Subject<User> = new Subject<User>();
  API_KEY: string = 'AIzaSyDEkKbczu1Fbmoiv-e0e3qqbwEkb7qzFrU';

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
    { email, password, returnSecureToken: true })
    .pipe(catchError(this.handleError), tap(resData => {
      const { email, expiresIn, idToken, localId } = resData;

      this.handleAuthentication(email, localId, idToken, +expiresIn);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
    { email, password, returnSecureToken: true })
    .pipe(catchError(this.handleError), tap(resData => {
      const { email, expiresIn, idToken, localId } = resData;

      this.handleAuthentication(email, localId, idToken, +expiresIn);
    }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'

      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }

      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'Email provided already exists...';
        break;
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid credentials...';
        break;
      }

      return throwError(errorMessage);
  }
}