import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../../service/authservice/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.loggedIn) {
      // User is logged in, and user has role 'admin', allow access
      if (this.authService.isAdmin()) {
        return true;
      }

      // Redirect to not-found page
      this.router.navigate(['/**']);
      return false;
    } else {
      // User is not logged in, redirect to login page
      this.router.parseUrl('/login');
      return false;
    }
  }
}
