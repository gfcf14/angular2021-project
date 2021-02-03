import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  API_KEY: string = 'AIzaSyDEkKbczu1Fbmoiv-e0e3qqbwEkb7qzFrU';

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
    { email, password, returnSecureToken: true })
    .pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error occurred!'

      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }

      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'Email provided already exists...';
        break;
      }

      return throwError(errorMessage);
    }));
  }
}