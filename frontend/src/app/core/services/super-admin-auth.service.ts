import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  encryptSensitiveData,
  hashSecurityAnswer,
} from '../utils/encryption.utils';
import { getPasswordErrors } from '../utils/validation.utils';

interface SuperAdminRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  registrationKey: string;
  organizationName: string;
  organizationRole: string;
  acceptedTerms: boolean;
  timezone: string;
  securityQuestions: {
    question: string;
    answer: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class SuperAdminAuthService {
  private apiUrl = `${environment.apiUrl}/super-admin`;
  private registrationStatusKey = 'superAdminRegistrationComplete';

  constructor(private http: HttpClient) {}

  register(data: SuperAdminRegistrationData): Observable<any> {
    // Validate password complexity
    const passwordErrors = getPasswordErrors(data.password);
    if (passwordErrors.length > 0) {
      return throwError(() => new Error(passwordErrors.join(', ')));
    }

    const secureData = {
      ...data,
      securityQuestions: data.securityQuestions.map((q) => ({
        question: q.question,
        answer: hashSecurityAnswer(q.answer),
      })),
    };

    const encryptedData = encryptSensitiveData(secureData, ['password']);

    return this.http.post(`${this.apiUrl}/register`, encryptedData).pipe(
      tap(() => {
        localStorage.setItem(this.registrationStatusKey, 'true');
      }),
      catchError(this.handleError)
    );
  }

  checkRegistrationStatus(): Observable<boolean> {
    const localStatus = localStorage.getItem(this.registrationStatusKey);
    // For development, always allow access to registration
    return of(true);
  }

  verifyRegistrationKey(key: string): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.apiUrl}/verify-key`, { key })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
