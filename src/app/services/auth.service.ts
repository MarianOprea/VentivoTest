import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISession, Session } from '../models/Session';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { IUser, IUserEntity } from '../models/User';
import { users } from '../mockData/users.json';

const TOKEN_STORE_KEY = 'auth';
const userData = users as IUserEntity[];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private session: ISession;
  private hasTokenBeenLoaded = false;

  constructor(
  ) {
    this.loadToken();
  }

  get isAuthenticated() {
    return Boolean(this.session);
  }

  get userInfo() {
    return this.session;
  }

  loadToken() {
    if (this.hasTokenBeenLoaded) {
      return Promise.resolve();
    }

    const json = localStorage.getItem(TOKEN_STORE_KEY);
    if (!json) {
      return Promise.resolve(null);
    }

    const session = JSON.parse(json);
    this.session = session;
    this.hasTokenBeenLoaded = true;
    return Promise.resolve();
  }

  login({ email, password }): Observable<boolean> {
    return new Observable((observer) => {
      this.loginResponse(email, password).subscribe({
        error: (error) => {
          observer.error(error);
        },
        next: (response) => {
          this.saveToken(response);
          observer.next(Boolean(response));
        },
      });
    });
  }

  loginResponse(email: string, password: string): Observable<ISession> {
    const checkUser = userData.find(
      (x) => x.email === email && x.password === password
    );

    if (!checkUser) {
      return throwError(null);
    }

    return of(Session.fromJson(checkUser));
  }

  private saveToken(session: ISession) {
    localStorage.setItem(TOKEN_STORE_KEY, JSON.stringify(session));
    this.session = session;
    this.hasTokenBeenLoaded = true;
  }

  logout(): Observable<boolean> {
    return new Observable((observer) => {
      this.clearSession();
      this.session = null;
      observer.next(true);
    });
  }

  clearSession() {
    this.deleteToken();
  }

  private deleteToken() {
    localStorage.removeItem(TOKEN_STORE_KEY);
    this.session = null;
  }
}
