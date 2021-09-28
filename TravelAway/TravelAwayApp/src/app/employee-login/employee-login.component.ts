import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../travelAway-services/user-service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {
  status: string[];
  errorMsg: string;
  msg: string;
  showDiv: boolean = false;
  name: string;
  constructor(private _userService: UserService, private router: Router) { }
  submitEmployeeForm(form: NgForm) {
    console.log(form.value.email);
    console.log(form.value.password);
    this._userService.validateEmployeeCredentials(form.value.email, form.value.password).subscribe(
      responseLoginStatus => {
        //console.log("Inside response");
        this.status = responseLoginStatus;
        console.log(this.status);
        this.showDiv = true;
        if (this.status != null) {
          sessionStorage.setItem('userName', form.value.email);
          sessionStorage.setItem('userRole', this.status[0]);
          sessionStorage.setItem('firstName', this.status[1]);
          sessionStorage.setItem('lastName', this.status[2]);


          this.router.navigate(['/home']);
        }
        else {
          alert(this.msg = "Try again with valid credentials");
        }

      },
      responseLoginError => {
        //console.log("Inside error");
        this.errorMsg = responseLoginError;
        console.log(this.errorMsg);
      },
      () => console.log("SubmitEmployeeForm method executed successfully")
    );
  }
  ngOnInit(): void {
  }

}
