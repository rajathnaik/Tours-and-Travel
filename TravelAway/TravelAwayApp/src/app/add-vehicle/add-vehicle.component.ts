import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../travelAway-services/user-service/user.service';
import { IAddVehicle } from '../travelAway-interfaces/addVehicle';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  vehiclePackage: FormGroup;
  vehicle: IAddVehicle;
  msg: string;
  status: number;
  errMsg: string;
  userRole: string;
  userName: string;
  VehicleId: number;
  BasePrice: number;
  bookingStatus: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  employeeLayout: boolean = false;
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _UserService:UserService,
    private router: Router)
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

    this.BasePrice = 450.00;
    this.vehiclePackage = this.formBuilder.group({
      vehicleName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      vehicleType: ['', [Validators.required]],
      rateperhr: ['', [Validators.required, , Validators.min(10)]],
      rateperkm: ['', [Validators.required, , Validators.min(10)]],
    });

    this.userRole = sessionStorage.getItem('userRole');
    this.userName = sessionStorage.getItem('userName')

  }
  SubmitForm(form: FormGroup) {

    this.bookingStatus = "Added"

    console.log(form.value.vehicleName,
      form.value.vehicleType,
      form.value.rateperhr, form.value.rateperkm
      , this.BasePrice)
    //this.book = {bookingId: 0, contactNumber: this.mobile, address: form.value.address, dateOfTravel: form.value.dateOftravel, numberOfAdults: form.value.adults, numberOfChildren: form.value.children,
    //  status: this.bookingStatus, emailId: this.userName, packageId: this.packageId
    //}

    this._UserService.addvehicles(
      form.value.vehicleName,
      form.value.vehicleType,
      form.value.rateperhr, form.value.rateperkm
      , this.BasePrice
    ).subscribe(

      responseSuccess => {
        this.status = responseSuccess
        console.log(responseSuccess)
        if (this.status > 0) {
          if (confirm("add vehicle done successfully ")) {
            //  this.bookAccomodation(this.book)
            this.router.navigate(['/home', this.status])
          }

          else
            this.router.navigate(['/home', this.status])
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

  //bookAccomodation(book: IBookings) {
  //  this.router.navigate(['/accomodation', book.bookingId])
  //}
}


