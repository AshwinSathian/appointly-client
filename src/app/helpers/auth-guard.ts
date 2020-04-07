import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
// import { MatDialog } from '@angular/material/dialog';
// import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    // private dialog: MatDialog
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      const errorMessage = 'Please login to access this section';
    //   this.dialog.open(ErrorDialogComponent, {data: {message: errorMessage}});
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
