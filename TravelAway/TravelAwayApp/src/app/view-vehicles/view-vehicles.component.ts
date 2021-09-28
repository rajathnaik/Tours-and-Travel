import { Component, OnInit } from '@angular/core';
import { IViewVehicle } from '../travelAway-interfaces/viewVehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../travelAway-services/user-service/user.service';

@Component({
  selector: 'app-view-vehicles',
  templateUrl: './view-vehicles.component.html',
  styleUrls: ['./view-vehicles.component.css']
})


export class ViewVehiclesComponent implements OnInit {
  constructor(private _UserService: UserService,
    private router: Router, private route: ActivatedRoute) { }
  emailId: string;
  showMsgDiv: boolean = false;
  errMsg: string;

  vehicleObj: IViewVehicle[];

  ngOnInit(): void {
    this.emailId = sessionStorage.getItem('emailId');
    this.ViewVehicleDetails();

  }
  ViewVehicleDetails() {
    this._UserService.ViewVehicleDetails().subscribe(
      x => {
        this.vehicleObj = x;
        console.log(this.vehicleObj.length);
        console.log(this.vehicleObj);
        if (this.vehicleObj == null) {
          this.showMsgDiv = true;
        }
        //console.log(this.showMsgDiv);
      },
      y => {
        this.errMsg = y;
        console.log(this.errMsg);
      },
      () => { console.log("ViewVehicleDetails method called successfully"); }
    )
  }

  RentVehicle(vehicle: IViewVehicle) {
    this.router.navigate(['/rentVehicle',
      vehicle.vehicleId, vehicle.ratePerHour, vehicle.ratePerKm,
      vehicle.vehicleName, vehicle.vehicleType]);
  }
}

