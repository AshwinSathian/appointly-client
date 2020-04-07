import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const BACKEND_BASE_URL = environment.backendBaseURL + 'slot/';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  constructor(private http: HttpClient) {}

  updateSlots(slots: Array<number>) {
    return this.http.post(BACKEND_BASE_URL + 'update-slots', { slots });
  }
}
