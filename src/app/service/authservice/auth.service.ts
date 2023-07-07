import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { UsersModel } from '../../component/formdesign/entity/Users.model';
import { Router, RouterModule, Routes } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private _isLoggedIn = false;
  private readonly urlu: string;

  constructor(private http: HttpClient, private router: Router) {
    this.urlu = `${environment.baseUrl}/users`;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<UsersModel[]>(this.urlu).pipe(
      map((users: UsersModel[]) => {
        const user = users.find(
          (u: UsersModel) => u.email === username && u.password === password
        );
        if (user) {
          this._isLoggedIn = true;
          this.loggedInSubject.next(this._isLoggedIn);
          return true;
        } else {
          this._isLoggedIn = false;
          this.loggedInSubject.next(this._isLoggedIn);
          return false;
        }
      })
    );
  }
  get loggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  logout(): void {
    // Perform the logout logic
    // Reset the isLoggedIn flag and emit the updated status
    this._isLoggedIn = false;
    this.removeRole();
    this.loggedInSubject.next(this._isLoggedIn);
    this.router.navigate(['/login']);
  }

  findUser(email: string): Observable<any> {
    const params = new HttpParams().append('email', email);
    return this.http.get(`${environment.baseUrl}/users`, { params });
  }
  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }
  removeRole(): void {
    localStorage.removeItem('role');
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }
}
