import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerLogoutComponent } from './customer-logout/customer-logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from '../app.routing';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { BookingComponent } from './booking/booking.component';
import { ViewPackagesComponent } from './view-packages/view-packages.component';
import { ViewPackageDetailsComponent } from './view-package-details/view-package-details.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { EmployeeLayoutComponent } from './employee-layout/employee-layout.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CustomercareComponent } from './customercare/customercare.component';
import { AddHotelComponent } from './addhotel/addhotel.component';
import { ViewHotelsComponent } from './view-hotels/view-hotels.component';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';
import { RentVehicleComponent } from './rent-vehicle/rent-vehicle.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

import { BookRatingComponent } from './book-rating/book-rating.component';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CustomerLoginComponent,
    CustomerLogoutComponent,
    HomeComponent,
    CommonLayoutComponent,
    CustomerLayoutComponent,
    ViewPackagesComponent,
    ViewPackageDetailsComponent,
    BookingComponent,
    ViewBookingsComponent,
    EmployeeLayoutComponent,
    AccomodationComponent,
    EmployeeLoginComponent,
    EditProfileComponent,
    CustomercareComponent,
    AddHotelComponent,
    ViewHotelsComponent,
    ViewVehiclesComponent,
    RentVehicleComponent,
    AddVehicleComponent,
    BookRatingComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule, routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
