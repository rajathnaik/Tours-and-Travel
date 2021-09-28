import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../travelAway-interfaces/Hotel';
import { UserService } from '../travelAway-services/user-service/user.service';

@Component({
  selector: 'app-addhotel',
  templateUrl: './addhotel.component.html',
  styleUrls: ['./addhotel.component.css']
})
export class AddHotelComponent implements OnInit {
  hotelPackage: FormGroup;
  hotel: IHotel;
  msg: string;
  status: number;
  errMsg: string;
  userRole: string;
  userName: string;
  packageId: number;
  HotelId: number;
  bookingStatus: string;
  cityList: string[];
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  employeeLayout: boolean = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private _UserService: UserService, private router: Router)
  {
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

  ngOnInit() {

    this.GetHotelCityList();

    this.hotelPackage = this.formBuilder.group({
      hotelName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      hotelRating: ['', [Validators.required, , Validators.min(2)]],
      singleRoomPrice: ['', [Validators.required, , Validators.min(1)]],
      doubleRoomPrice: ['', [Validators.required, , Validators.min(1)]],
      deluxeeRoomPrice: ['', [Validators.required, , Validators.min(1)]],
      suiteRoomPrice: ['', [Validators.required, , Validators.min(1)]],
      city: [''],

    });

    this.userRole = sessionStorage.getItem('userRole');
    this.userName = sessionStorage.getItem('userName')

  }
  SubmitForm(form: FormGroup) {

    this.bookingStatus = "Added"

    console.log(form.value.hotelName, form.value.hotelRating, form.value.singleRoomPrice, form.value.doubleRoomPrice,
      form.value.deluxeeRoomPrice, form.value.suiteRoomPrice, form.value.city, this.packageId)

    this._UserService.addhotels(form.value.hotelName, parseInt(form.value.hotelRating), form.value.singleRoomPrice, form.value.doubleRoomPrice,
      form.value.deluxeeRoomPrice, form.value.suiteRoomPrice, form.value.city, this.packageId).subscribe(

        responseSuccess => {
          this.status = responseSuccess
          console.log(responseSuccess)
          if (this.status > 0) {
            if (confirm("add hotel done successfully ")) {
              this.router.navigate(['/home'])
            }

            else
              this.router.navigate(['/home'])
          }
          else {
            alert("Could Not Book.");
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

  GetHotelCityList() {
    this._UserService.getAllCities().subscribe(

      responseCities => {
        this.cityList = responseCities;
      },
      responseError => {
        console.log(responseError)
      },
      () => console.log("Cities executed")

    )
  }

  getPackageId(form: FormGroup) {
    this._UserService.getPackageId(form.value.city).subscribe(
      responsePackageId => {
        this.packageId = responsePackageId;
        console.log(this.packageId)

      },
      responseError => {
        console.log(responseError)
      },

      () => console.log("Package Id fetched")
    )
  }

  //bookAccomodation(book: IBookings) {
  //  this.router.navigate(['/accomodation', book.bookingId])
  //}
}
