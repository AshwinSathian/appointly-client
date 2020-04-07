import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  @ViewChild('details') details: ElementRef;
  @ViewChild('header') header: ElementRef;

  allSlots: Array<number>;
  activeSlots: Array<number>;
  todaysBookedSlots: Array<number>;
  tomorrowsBookedSlots: Array<number>;
  hostName: string;
  hostEmail: string;
  isBooking: boolean;
  appointmentDate: any;
  appointmentSlot: number;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private sharedService: SharedService
  ) {
    this.hostName = '';
    this.hostEmail = '';
    this.allSlots = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
      13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
    ];
    this.activeSlots = [];
    this.todaysBookedSlots = [];
    this.tomorrowsBookedSlots = [];
    this.isBooking = false;
    this.appointmentDate = {
      day: '',
      date: ''
    };
    this.appointmentSlot = null;
  }

  ngOnInit(): void {
    this.hostName = this.route.snapshot.data.hostData.name;
    this.hostEmail = this.route.snapshot.data.hostData.email;
    this.activeSlots = this.route.snapshot.data.hostData.activeSlots;
    this.todaysBookedSlots = this.route.snapshot.data.hostData.todaysBookedSlots;
    this.tomorrowsBookedSlots = this.route.snapshot.data.hostData.tomorrowsBookedSlots;
  }

  shouldDisable(day: string, slot: number): boolean {
    if (day === 'today') {
      if (!this.activeSlots.includes(slot) || this.todaysBookedSlots.includes(slot)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (!this.activeSlots.includes(slot) || this.tomorrowsBookedSlots.includes(slot)) {
        return true;
      } else {
        return false;
      }
    }
  }

  getBookingStatus(day: string, slot: number): string {
    if (day === 'today') {
      if (this.activeSlots.includes(slot)) {
        if (
          this.todaysBookedSlots.includes(slot)
        ) {
          return 'booked';
        } else {
          return 'free';
        }
      }
    } else {
      if (this.activeSlots.includes(slot)) {
        if (
          this.tomorrowsBookedSlots.includes(slot)
        ) {
          return 'booked';
        } else {
          return 'free';
        }
      }
    }
  }

  initiateBooking(day: string, slot: number) {
    if (day === 'today') {
      this.appointmentDate.day = 'today';
      const today = new Date();
      const month = today.getMonth() + 1;
      // tslint:disable-next-line: max-line-length
      this.appointmentDate.date = `${today.getFullYear()}-${month.toString().length > 1 ? month : '0' + month}-${today.getDate().toString().length > 1 ? today.getDate() : '0' + today.getDate()}`;
    } else {
      this.appointmentDate.day = 'today';
      const tomorrow = new Date(Date.now() + (24 * 60 * 60 * 1000));
      const month = tomorrow.getMonth() + 1;
      // tslint:disable-next-line: max-line-length
      this.appointmentDate.date = `${tomorrow.getFullYear()}-${month.toString().length > 1 ? month : '0' + month}-${tomorrow.getDate().toString().length > 1 ? tomorrow.getDate() : '0' + tomorrow.getDate()}`;
    }
    this.appointmentSlot = slot;
    this.isBooking = true;
    this.details.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  bookAppointment() {
    this.sharedService.startLoader('Booking Appointment');
    if (this.appointmentDate.day === 'today') {
      this.todaysBookedSlots.push(this.appointmentSlot);
    } else {
      this.tomorrowsBookedSlots.push(this.appointmentSlot);
    }

    this.bookingService.bookAppointment(
      this.hostEmail,
      this.appointmentSlot,
      this.appointmentDate.date
    )
    .subscribe((response: any) => {
      this.isBooking = false;
      this.appointmentDate = {
        day: '',
        date: ''
      };
      this.appointmentSlot = null;
      this.sharedService.stopLoader();
      // this.header.nativeElement.scrollIntoView({ behavior: 'smooth' });
      // window.scrollTo({top: 0, behavior: 'smooth'});
      window.location.reload();
    });
  }
}
