import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const BACKEND_BASE_URL = environment.backendBaseURL + 'booking/';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  bookAppointment(host: string, slot: number, date: string) {
    const appointment = {
      guest: this.authService.getUserEmail(),
      host,
      date,
      slot
    };
    return this.http.post(BACKEND_BASE_URL + 'book-appointment', appointment);
  }
}
