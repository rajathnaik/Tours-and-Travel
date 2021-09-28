import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../travelAway-services/user-service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  msg: string;
  status: boolean;
  errorMsg: string;
  constructor(private formBuilder: FormBuilder, private _userService: UserService, private router: Router) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.minLength(12)]],
      firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[1-9]{1}[0-9]{9}")]],
      dateOfbirth: ['', [Validators.required, checkDate]],
      address: ['', Validators.required],
      cpassword: ['', Validators.required]
    }
    );
  }
  SubmitForm(form: FormGroup) {
    console.log(form.value.emailId, form.value.password, form.get('gender').value,
      form.value.firstName, form.value.lastName, form.value.contactNumber, form.value.dateOfbirth, form.value.address);
    var roleId = 0;
    this._userService.addCustomerDetails(form.value.firstName, form.value.lastName, form.value.emailId, form.value.password,
      form.get('gender').value, form.value.contactNumber, form.value.dateOfbirth, form.value.address, roleId).subscribe(
      responseAddData => {
        this.status = responseAddData;
        if (this.status) {
          alert('User Sucessfully Registered');
         this.router.navigate(['/login']);
        }
        else {
          alert('Some Error Occured');
          this.router.navigate(['/home']);
        }
      },
      responseAddError => {
        this.errorMsg = responseAddError;
        console.log(this.errorMsg);
        alert("Some error occured, please try after some time.");
        this.router.navigate(['/home']);
      },
      () => console.log("Add user method executed successfully.")
    );


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



