import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../travelAway-interfaces/Hotel';
import { UserService } from '../travelAway-services/user-service/user.service';
import { IAccomodation } from '../travelAway-interfaces/accomodation';


@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css']
})
export class AccomodationComponent implements OnInit {
  AccommodationForm: FormGroup;
  bookingId: number;
  cityList: string[];
  hotelList: IHotel[];
  estimatedCost: number;
  MSG: string;

  constructor(private _UserService: UserService, private _FormBuilder: FormBuilder, private _Route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.bookingId = parseInt(this._Route.snapshot.params['bookingId']);
    //this.GetHotelDetailsList();
    this.GetAllCityList();

    this.AccommodationForm = this._FormBuilder.group({
      BookingId: [this.bookingId,],
      HotelName: ['', [Validators.required]],
      City: ['', [Validators.required]],
      HotelType: ['', [Validators.required]],
      NumberOfRooms: ['', [Validators.required, Validators.min(1)]],
      RoomType: ['', [Validators.required]],
      //Cost: ['', [Validators.required]]
    });
  }




  GetAllCityList() {
    this._UserService.getAllCities().subscribe(
      success => {
        this.cityList = success;
        //console.log(success);
      },
      error => { console.log(error); },
      () => { console.log("GetAllCityList method executed succefully"); }
    );
  }




  GetHotelsByCityNameAndHotelType(form: FormGroup) {
    let cityName: string = form.value.City;
    let hotelType: number = form.value.HotelType;

    if (form.value.City == "") {
      cityName = "All"
    }
    if (form.value.HotelType == "") {
      hotelType = 0;
    }

    this._UserService.GetHotelsByCityNameAndHotelType(cityName, hotelType).subscribe(
      success => {
        console.log(success);
        this.hotelList = success;
      },
      error => { console.log(error); },
      () => { console.log("GetHotelsByCityNameAndHotelType executed successfully"); }
    );
  }




  GetCalculatedEstimateCost(form: FormGroup) {
    let hotelName: string = form.value.HotelName;
    let numberOfRooms: number = parseInt(form.value.NumberOfRooms);
    let roomType: string = form.value.RoomType;

    if (numberOfRooms && hotelName && roomType && (numberOfRooms > 0)) {
      this._UserService.GetCalculatedEstimateCost(hotelName, roomType, numberOfRooms).subscribe(
        success => {
          //console.log(success);
          //if (success == -1) {
          //  console.log("Error : " + success);
          //}
          this.estimatedCost = success;
          console.log(this.estimatedCost);
        },
        error => { console.log(error); },
        () => { console.log("GetCalculatedEstimateCost method executed successfully"); });
    }

  }



  AccommodationFromSubmit(form: FormGroup) {
    if (form.valid && this.estimatedCost) {

      let obj: IAccomodation;
      obj = {
        AccomodationId: 0,
        BookingId: this.bookingId,
        HotelName: form.value.HotelName,
        City: form.value.City,
        HotelRating: parseInt(form.value.HotelType),
        NoOfRooms: form.value.NumberOfRooms,
        RoomType: form.value.RoomType,
        Price: this.estimatedCost
      }

      console.log(this.bookingId, form.value.HotelName, form.value.City, parseInt(form.value.HotelType), form.value.NumberOfRooms, form.value.RoomType, this.estimatedCost)

      this._UserService.AddAccomodation(obj).subscribe(
        success => {
          if (success == 1) {
            console.log(success);
            this.router.navigate(['/payments', this.bookingId, this.estimatedCost])

          } else if (success == -1) {
            console.log(this.MSG = "Accommodation is already added for this BookingID!");
          } else if (success == -2) {
            console.log(this.MSG = "Invalid BookingID!");
          } else {
            console.log(success, "inside else");
            //this.router.navigate(['/payments', this.bookingId, this.estimatedCost])
          }


        },
        error => {
          console.log(error);
          alert("Something Went Wrong. \n Please Try Again ")
        },
        () => {
          console.log("Add Accommodation method executed ");
        }
      );
    }
  }


  CancelRequest() {
    console.log("Cancel button clicked");
    alert("Accomodation Cancelled !\n Redirecting ...");
    this.router.navigate(['/packages'])
  }



}




