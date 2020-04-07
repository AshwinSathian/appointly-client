import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

const BACKEND_BASE_URL = environment.backendBaseURL + 'booking/';

@Injectable({
  providedIn: 'root'
})
export class AppointmentResolverService implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.http.get(BACKEND_BASE_URL + 'get-all-appointments/' + this.authService.getUserEmail());
  }
}
