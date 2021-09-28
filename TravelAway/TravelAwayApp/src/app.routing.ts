import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RegisterComponent } from './app/register/register.component';
import { HomeComponent } from './app/home/home.component';
import { CustomerLoginComponent } from './app/customer-login/customer-login.component';
import { EmployeeLoginComponent } from './app/employee-login/employee-login.component';
import { ViewPackagesComponent } from './app/view-packages/view-packages.component';
import { ViewPackageDetailsComponent } from './app/view-package-details/view-package-details.component';
import { BookingComponent } from './app/booking/booking.component';
import { AuthGuardService } from './app/travelAway-services/auth-services/auth-guard.service';
import { AccomodationComponent } from './app/accomodation/accomodation.component';
import { ViewBookingsComponent } from './app/view-bookings/view-bookings.component';
import { EditProfileComponent } from './app/edit-profile/edit-profile.component';
import { CustomercareComponent } from './app/customercare/customercare.component';
import { AddHotelComponent } from './app/addhotel/addhotel.component';
import { ViewVehiclesComponent } from './app/view-vehicles/view-vehicles.component';
import { RentVehicleComponent } from './app/rent-vehicle/rent-vehicle.component';
import { AddVehicleComponent } from './app/add-vehicle/add-vehicle.component';
import { ViewHotelsComponent } from './app/view-hotels/view-hotels.component';
import { PaymentsComponent } from './app/payments/payments.component';
import { BookRatingComponent } from './app/book-rating/book-rating.component';
import { Route } from '@angular/compiler/src/core';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: CustomerLoginComponent },
  { path: 'employeelogin', component: EmployeeLoginComponent },
  { path: 'bookpackage/:packageId', component: BookingComponent },
  { path: 'accomodation/:bookingId', component: AccomodationComponent },
  { path: 'viewPackages', component: ViewPackagesComponent, canActivate: [AuthGuardService] },
  { path: 'editProfile', component: EditProfileComponent, canActivate: [AuthGuardService] },
  { path: 'viewBookings', component: ViewBookingsComponent, canActivate: [AuthGuardService] },
  { path: 'viewPackageDetails/:packageId/:packageName', component: ViewPackageDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'viewVehicles', component: ViewVehiclesComponent, canActivate: [AuthGuardService] },
  { path: 'addVehicles', component: AddVehicleComponent, canActivate: [AuthGuardService] },
  { path: 'rentVehicle/:vehicleId/:ratePerHour/:ratePerKm/:vehicleName/:vehicleType', component: RentVehicleComponent },
  { path: 'viewHotels', component: ViewHotelsComponent, canActivate: [AuthGuardService] },
  { path: 'customerCare', component: CustomercareComponent, canActivate: [AuthGuardService] },
  { path: 'addHotel', component: AddHotelComponent, canActivate: [AuthGuardService] },
  { path: 'payments/:bookingId/:estimatedCost', component: PaymentsComponent, canActivate: [AuthGuardService] },
  { path: 'addRating/:bookingId', component: BookRatingComponent},

  { path: '**', component: HomeComponent }
];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(routes);
