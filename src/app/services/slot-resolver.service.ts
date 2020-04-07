import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const BACKEND_BASE_URL = environment.backendBaseURL + 'slot/';

@Injectable({
  providedIn: 'root'
})
export class SlotResolverService implements Resolve<any> {

  constructor(
    private http: HttpClient
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.http.get(BACKEND_BASE_URL + 'active-slots');
  }
}
