import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  imageSrc: string
  userRole: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  employeeLayout: boolean = false;
  constructor() {

  this.imageSrc = 'assets/travelAway.png'
  this.userRole = sessionStorage.getItem('userRole');
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    }
    else if (this.userRole == "Employee") {
      this.employeeLayout = true;
    }
    else {
      this.commonLayout = true;
    }

  

   }
}

