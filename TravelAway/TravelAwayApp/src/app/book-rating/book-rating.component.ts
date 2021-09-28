import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../travelAway-services/user-service/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-book-rating',
  templateUrl: './book-rating.component.html',
  styleUrls: ['./book-rating.component.css']
})
export class BookRatingComponent implements OnInit {
  bookingId: number;
  rating1: number;
  comments: string;
  status: boolean;
  errorMsg: string;
  userName: string;
  ratingForm: FormGroup;
  constructor(private route: ActivatedRoute, private _userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem("userName");
    if (this.userName == null) {
      this.router.navigate(['/login']);
    }
    this.bookingId = parseInt(this.route.snapshot.params['bookingId']);
    this.ratingForm = this.formBuilder.group(
      {
        rating1: ['', Validators.required],
        comments: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]]
      });
  }

  bookratings(form: FormGroup) {
    if (this.ratingForm.valid) {
      this._userService.addRating(form.value.rating1, form.value.comments, this.bookingId).subscribe(
        responseRatingStatus => {
          this.status = responseRatingStatus;
          if (this.status) {
            alert("Rating done successfully");
            console.log(form.value.rating1, form.value.comments, this.bookingId);
            this.router.navigate(['/home']);
          }
          else {
            alert("Some error occured, please try after some time.");
            this.router.navigate(['/home']);
          }
        },
        responsRatingeError => {
          this.errorMsg = responsRatingeError;
          console.log(this.errorMsg);
          alert("Some error occured, please try after some time.");
          this.router.navigate(['/home']);
        },
        () => console.log("Rating method executed successfully.")
      );
    }
  }
}
























