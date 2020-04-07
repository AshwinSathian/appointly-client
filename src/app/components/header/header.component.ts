import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() openDrawer: EventEmitter<boolean>;

  userIsAuthenticated: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(
    Breakpoints.Handset
  ).pipe(
    map(result => result.matches),
    shareReplay()
  );
  private authListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    // private sharedService: SharedService
  ) {
    this.userIsAuthenticated = false;
    this.openDrawer = new EventEmitter();
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  toggleDrawer() {
    this.openDrawer.emit(true);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
