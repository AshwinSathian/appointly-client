import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from './services/auth.service';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(
    Breakpoints.Handset
  ).pipe(
    map(result => result.matches),
    shareReplay()
  );
  userIsAuthenticated: boolean;
  userOrg: string;
  currentProjectId: string;
  private authListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public sharedService: SharedService
  ) {
    this.userIsAuthenticated = false;
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.authService.autoAuthUser();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.drawer.close();
        this.sharedService.startLoader();
      } else if (event instanceof NavigationEnd) {
        this.sharedService.stopLoader();
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
