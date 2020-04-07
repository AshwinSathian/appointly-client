import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

const BACKEND_BASE_URL = environment.backendBaseURL + 'booking/';

@Injectable({
  providedIn: 'root'
})
export class SlugResolverService implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.http.get(BACKEND_BASE_URL + 'booking-details/' + route.paramMap.get('slug'));
  }
}
