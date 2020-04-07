import { Component, OnInit } from '@angular/core';
import { dashboardActions } from './dashboard-actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  actions: Array<any>;
  bookingURL: string;

  constructor(
    private authService: AuthService
  ) {
    this.actions = [];
    this.bookingURL = '';
  }

  ngOnInit(): void {
    this.actions = dashboardActions;
    this.bookingURL =
      window.location.href +
      'book-appointment/' +
      this.authService.getUserEmail().split('@')[0];
  }
}
