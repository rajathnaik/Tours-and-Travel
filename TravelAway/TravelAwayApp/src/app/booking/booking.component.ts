import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../travelAway-services/user-service/user.service';
import { IBookings } from '../travelAway-interfaces/bookings';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookPackage: FormGroup;
  book: IBookings;
  msg: string;
  status: number;
  errMsg: string;
  userRole: string;
  userName: string;
  packageId: number;
  mobile: number;
  bookingStatus: string;
  bookingId: number;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private _taService: UserService, private router: Router) { }

  ngOnInit() {

    this.bookPackage = this.formBuilder.group({
      contactNumber: ['', [Validators.required, Validators.pattern("^[1-9][0-9]{9}$")]],
      address: ['', [Validators.required]],
      dateOftravel: ['', [Validators.required, checkDate]],

      adults: ['', [Validators.required, , Validators.min(1)]],
      children: ['', [Validators.required, , Validators.min(0)]]
    });

    this.userRole = sessionStorage.getItem('userRole');
    this.userName = sessionStorage.getItem('userName')
    this.packageId = parseInt(this.route.snapshot.params['packageId']);

  }
  SubmitForm(form: FormGroup) {
    
    this.mobile = parseInt(form.value.contactNumber);
    this.bookingStatus = "Booked"
    console.log(this.packageId);
    console.log(this.userName);
    console.log(this.mobile);
    console.log(form.value.address);
    console.log(form.value.dateOftravel);
    console.log(form.value.adults);
    console.log(form.value.children);
    console.log(this.bookingStatus);

    this.book = {bookingId: 0, contactNumber: this.mobile, address: form.value.address, dateOfTravel: form.value.dateOftravel, numberOfAdults: form.value.adults, numberOfChildren: form.value.children,
      status: this.bookingStatus, emailId: this.userName, packageId: this.packageId
    }

    this._taService.BookPackage(this.mobile, form.value.address, form.value.dateOftravel, form.value.adults,
      form.value.children, this.userName, this.packageId, this.bookingStatus).subscribe(

        responseSuccess => {
          this.status = responseSuccess
          console.log(responseSuccess)
          if (this.status>0) {
            if (confirm("Booking done successfully\nDo you want to continue to book accomodation?"))
              //this.bookAccomodation(this.book)
              this.router.navigate(['/accomodation', this.status])
            else
              this.router.navigate(['/viewBookings'])
          }
          else {
            alert("cannot book.");
          }
        },
        responseError => {
          this.errMsg = responseError
          console.log(this.errMsg);
          alert("Some error occured, please try after some time.");
        },
        () => console.log("SubmitForm method executed succesfully")
      );
    
  }

  bookAccomodation(book: IBookings) {
    this.router.navigate(['/accomodation', book.bookingId])
  }
}


function checkDate(control: FormControl) {
  var currentD = new Date();
  var userD = new Date(control.value);
  if (userD >= currentD || userD == null) {
    return null;
  }
  else {
    return {
      CDError: {
        message: "enter a date greater than todays date"
      }
    }
  }
}
