import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IVehicleBooked } from '../travelAway-interfaces/rentVehicle';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../travelAway-services/user-service/user.service';

@Component({
  selector: 'app-rent-vehicle',
  templateUrl: './rent-vehicle.component.html',
  styleUrls: ['./rent-vehicle.component.css']
})


export class RentVehicleComponent implements OnInit {
  constructor(private _UserService: UserService,
    private router: Router, private route: ActivatedRoute) { }
  emailId: string;
  showMsgDiv: boolean = false;
  errMsg: string;
  vehicleId: number;
  vehicleName: string;
  vehicleType: string;
  ratePerHour: number;
  ratePerKm: number;
  noOfHours: number;
  noOfKm: number;
  base: number;
  cost: number;
  r: IVehicleBooked

  vehicleBookingId: number;
  ngOnInit(): void {
    this.emailId = sessionStorage.getItem('emailId');
    this.vehicleId = parseInt(this.route.snapshot.params['vehicleId']);
    console.log(this.vehicleId);
    this.vehicleName = this.route.snapshot.params['vehicleName'];
    console.log(this.vehicleName);
    this.ratePerHour = parseInt(this.route.snapshot.params['ratePerHour']);
    console.log(this.ratePerHour);
    this.ratePerKm = parseInt(this.route.snapshot.params['ratePerKm']);
    console.log(this.ratePerKm);
    this.vehicleType = this.route.snapshot.params['vehicleType'];
    console.log(this.vehicleType);
    if (this.vehicleType == "Mini-Bus") {
      this.base = 350;

    }
    if (this.vehicleType == "Two-Wheeler") {
      this.base = 100;
    }
    if (this.vehicleType == "Four-Wheeler") {
      this.base = 200;
    }
  }
  RentVehicle(form: NgForm) {
    this.cost = ((this.noOfHours * this.ratePerHour) *
      (this.noOfKm * this.ratePerKm)) + this.base;
    this.r = {
      VehicleId: this.vehicleId,
      VehicleName: this.vehicleName,
      BookingDate: form.value.bod,
      PickupTime: form.value.time,
      NoOfHours: this.noOfHours,
      NoOfKms: this.noOfKm,
      TotalCost: this.cost,
      VehicleStatus:"Booked"
    }
    console.log(this.r);

    this._UserService.RentVehicle(this.r).subscribe(
      x => {
        this.vehicleBookingId = x;
        if (this.vehicleBookingId <= 0) {
          this.showMsgDiv = true;


        }
        alert("Vehicle has been booked: " + this.vehicleBookingId);
        this.router.navigate(['/home']);
      },
      y => {
        this.errMsg = y;
        console.log(this.errMsg);
      },
      () => { console.log("rent Vehicle Method called successfully"); }
    )

  }

}
