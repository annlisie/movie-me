import {Component, Input, OnInit} from '@angular/core';
import {EventManager} from './../authentication/event.manager';
import {AuthenticationService} from './../authentication/authentication.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public showNavBar: boolean;
  public userEmail: string;
  constructor(private eventManager: EventManager, private authenticationService: AuthenticationService) {
    this.eventManager.showNavBarEmitter.subscribe((mode) => {
      // mode will be null the first time it is created, so you need to igonore it when null
      if (mode !== null) {
        this.showNavBar = mode;
        if (this.showNavBar) {
          let user = JSON.parse(localStorage.getItem('currentUser'));
          this.userEmail = user.email;
        }
      }
    });
    if (localStorage.getItem('currentUser') != null) {
      this.showNavBar = true;
      const user = JSON.parse(localStorage.getItem('currentUser'));
      this.userEmail = user.email;
    }
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }

}
