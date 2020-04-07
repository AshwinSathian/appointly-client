import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  hostedAppointments: Array<any>;
  guestAppointments: Array<any>;
  
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.hostedAppointments = [];
    this.guestAppointments = []
  }

  ngOnInit(): void {
    this.hostedAppointments = this.route.snapshot.data.appointments.hostedAppointments;
    this.guestAppointments = this.route.snapshot.data.appointments.guestAppointments
  }
}
