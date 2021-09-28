import { Component, OnInit } from '@angular/core';
import { UserService } from '../travelAway-services/user-service/user.service';
import { IBookings } from '../travelAway-interfaces/bookings';
import { Router } from '@angular/router';
import { IRating } from '../travelAway-interfaces/rating';
@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {
  errorMsg: string;
  emailId: string;
  bookings: IBookings[];
  showError: boolean = false;
  status: boolean = false;
  imageSrc: string;
  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.emailId = sessionStorage.getItem('userName');
    if (this.emailId == null) {
      this.router.navigate(['/login']);
    }
    this._userService.getAllBookings(this.emailId)
      .subscribe(
        resBookingData => {
          this.bookings = resBookingData;
          if (this.bookings.length == 0) {
            this.showError = true;
            this.errorMsg = "Your Booking Details is empty.";
          }
        },
        resBookingError => {
          this.bookings = null;
          this.errorMsg = resBookingError;
          console.log(this.errorMsg);
          if (this.bookings.length == 0) {
            this.showError = true;
            this.errorMsg = "No records found.";
          }
        },
        () => console.log("GetBookings method executed successfully")
      );
    //this.imageSrc = "assets/delete-item.jpg";

  }

  addRating(booking: IRating) {
    this.router.navigate(['/addRating', booking.bookingId])
  }
}
