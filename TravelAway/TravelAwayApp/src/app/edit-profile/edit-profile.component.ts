import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../travelAway-services/user-service/user.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  registerForm: FormGroup;
  msg: string;
  emailId: string;
  errorMsg: any;
  status: boolean;
  firstName: string;

  userRole: string;
  lastName: string;

  constructor(private formBuilder: FormBuilder, private router: Router,  private _userService: UserService) { }

  ngOnInit() {

    this.emailId = sessionStorage.getItem("userName");
    this.userRole = sessionStorage.getItem('userRole');
    this.firstName = sessionStorage.getItem('firstName');
    this.lastName = sessionStorage.getItem('lastName');
    if (this.userRole != "Customer") {
      this.router.navigate(['/home']);
    }

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      gender: ['', Validators.required],
      dateOfbirth: ['', [Validators.required, checkDate]],
      address: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[1-9]{1}[0-9]{9}")]]
    })
  }
  Update(form: FormGroup) {

    console.log(form.value.lastName, form.get('gender').value,
      form.value.dateOfbirth, form.value.address, form.value.contactNumber);
    this._userService.UpdateUserProfile(form.value.firstName, form.value.lastName, this.emailId, form.get('gender').value, form.value.contactNumber, form.value.dateOfbirth,
      form.value.address).subscribe(
        responseUpdateData => {
          this.status = responseUpdateData
          alert("Details updated succesfully!")
          this.router.navigate(['/home']);
          this.ngOnInit();
        },
        responseUpdateError => {
          this.errorMsg = responseUpdateError
          alert("Something went wrong!")
        },
        () => console.log("UpdateMethod executed succesfully!")
      )
  }
}
function checkDate(control: FormControl) {
  var currentDate = new Date();
  var givenDate = new Date(control.value)
  console.log(currentDate);
  console.log(givenDate);
  if (givenDate <= currentDate || givenDate == null) {
    return null
  }
  else {
    return {
      dateError: {
        message: "Enter a date less than today's date"
      }
    };
  }
}
