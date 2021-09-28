import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html'
})
export class CustomerLayoutComponent {
  userRole: string;
  userName: string;
  firstName: string;
  lastName: string;

  constructor(private router: Router) {
    this.userRole = sessionStorage.getItem('userRole');
    this.userName = sessionStorage.getItem('userName');
    this.firstName = sessionStorage.getItem('firstName');
    this.lastName = sessionStorage.getItem('lastName');
  }
  logOut() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    this.router.navigate(['/login']);
  }
}
