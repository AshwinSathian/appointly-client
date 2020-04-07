import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SlotsComponent } from './components/slots/slots.component';
import { SlotResolverService } from './services/slot-resolver.service';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { AppointmentResolverService } from './services/appointment-resolver.service';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { SlugResolverService } from './services/slug-resolver.service';
import { AuthGuard } from './helpers/auth-guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'slots',
    component: SlotsComponent,
    resolve: {
      slots: SlotResolverService,
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
    resolve: {
      appointments: AppointmentResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'book-appointment/:slug',
    component: BookAppointmentComponent,
    resolve: {
      hostData: SlugResolverService
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
