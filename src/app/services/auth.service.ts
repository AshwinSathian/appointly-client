import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_BASE_URL = environment.backendBaseURL + 'auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean;
  private token: string;
  private tokenTimer: any;
  private userEmail: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = false;
    this.token = '';
    this.userEmail = '';
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserEmail() {
    return this.userEmail;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string, email: string, password: string) {
    const authData = { name, email, password };
    this.http.post(BACKEND_BASE_URL + 'signup', authData)
    .subscribe(response => {
        this.router.navigate(['/login']);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }

  login(email: string, password: string) {
    const authData = { email, password };
    this.http
      .post<{ token: string; expiresIn: number; userEmail: string }>(
        BACKEND_BASE_URL + 'login',
        authData
      )
      .subscribe(
        (response: any) => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userEmail = response.userEmail;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.userEmail);
            this.router.navigate(['/']);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userEmail = authInformation.userEmail;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userEmail = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userEmail: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userEmail', userEmail);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userEmail');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userEmail = localStorage.getItem('userEmail');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userEmail
    };
  }
}
