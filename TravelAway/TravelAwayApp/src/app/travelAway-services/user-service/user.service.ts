import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ICustomer } from 'src/app/travelAway-interfaces/customer';
import { IBookings } from 'src/app/travelAway-interfaces/bookings';
import { IPackage} from 'src/app/travelAway-interfaces/package';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IEmployee } from '../../travelAway-interfaces/employee';
import { ICustomerCare } from '../../travelAway-interfaces/customerCare';
import { IHotel } from '../../travelAway-interfaces/Hotel';
import { IViewVehicle } from '../../travelAway-interfaces/viewVehicle';
import { IVehicleBooked } from '../../travelAway-interfaces/rentVehicle';
import { IAddVehicle } from '../../travelAway-interfaces/addVehicle';
import { IViewHotel } from '../../travelAway-interfaces/viewHotel';
import { IAccomodation } from '../../travelAway-interfaces/accomodation';
import { IRating } from '../../travelAway-interfaces/rating';
import { IPayment } from '../../travelAway-interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

//Validate Customer Credentials
  validateCredentials(id: string, password: string): Observable<string[]>
  {
    var cusObj: ICustomer;
    cusObj = {  emailId: id, userPassword: password };
    return this.http.post<string[]>('http://localhost:60200/api/user/ValidateUserCredentials', cusObj).pipe(catchError(this.errorHandler));
  }

//Validate Employee Credentials
  validateEmployeeCredentials(id: string, password: string): Observable<string[]>
  {
    var cusObj: IEmployee;
    cusObj = { emailId: id, password: password };
    return this.http.post<string[]>('http://localhost:60200/api/user/ValidateEmployeeCredentials', cusObj).pipe(catchError(this.errorHandler));
  }

//Add Customer Details in Registration
  addCustomerDetails(firstName: string, lastName: string, emailId: string, userPassword: string, gender: string, contactNumber: number, dateOfBirth: Date,address:string,roleId:number): Observable<boolean> 
  {
      var cusObj: ICustomer;
      cusObj = {
                 firstName: firstName, lastName: lastName,emailId: emailId, userPassword: userPassword,
                  gender: gender, contactNumber: contactNumber, dateOfBirth: dateOfBirth, address: address, roleId: 0
               };
    return this.http.post<boolean>('http://localhost:60200/api/user/InsertCustomerDetails', cusObj).pipe(catchError(this.errorHandler));
  }

  UpdateUserProfile(firstName: string, lastName: string, emailId: string, gender: string, contactNumber: number, dateOfBirth: Date, address: string): Observable<boolean> {
      var editUser = { FirstName: firstName, LastName: lastName, EmailId: emailId, Gender: gender, ContactNumber: contactNumber, DateOfBirth: dateOfBirth, Address: address };
      return this.http.put<boolean>('http://localhost:60200/api/user/UpdateCustomerProfileUsingAPI', editUser).pipe(catchError(this.errorHandler));
  }

  BookPackage(contactNumber: number, address: string, dateOfTravel: Date, numberOfAdults: number, numberOfChildren: number, emailId: string, packageId: number, status: string): Observable<number>
  {
      var bookObj: IBookings;
      bookObj = { bookingId: 0, contactNumber: contactNumber, address: address, dateOfTravel: dateOfTravel, numberOfAdults: numberOfAdults, numberOfChildren: numberOfChildren, status: status, emailId: emailId, packageId: packageId }
      return this.http.post<number>('http://localhost:60200/api/user/BookPackage', bookObj).pipe(catchError(this.errorHandler));
  }

  getAllBookings(emailId: string): Observable<IBookings[]>
  {
      let param = "?emailId=" + emailId;
      return this.http.get<IBookings[]>('http://localhost:60200/api/user/GetBookings' + param).pipe(catchError(this.errorHandler));
  }

  addCustomerQuery(bookingId: number, query: string, queryStatus: string, assignee: string, queryAnswer: string): Observable<boolean> {
    var cusObj: ICustomerCare;
    cusObj = { bookingId: bookingId, query: query, queryStatus: "In Progress", assignee: "ABC", queryAnswer: "Not Resolved yet" };
    return this.http.post<boolean>('http://localhost:60200/api/user/CustomerCare', cusObj).pipe(catchError(this.errorHandler));
  }
  getBookingId(emailId: string): Observable<number> {
    let param = "?emailId=" + emailId;
    return this.http.get<number>('http://localhost:60200/api/user/GetCustomerCareBookingId' + param).pipe(catchError(this.errorHandler));
  }


  getAllCities(): Observable<string[]>
  {
   return this.http.get<string[]>('http://localhost:60200/api/User/GetAllCityList').pipe(catchError(this.errorHandler));
  }

  getPackageId(city: string): Observable<number> {
    let param = "?city=" + city;
    return this.http.get<number>('http://localhost:60200/api/user/GetPackageIdByCity' + param).pipe(catchError(this.errorHandler));
  
  }

  GetHotelsByCityNameAndHotelType(cityName: string, hotelType: number): Observable<IHotel[]> {
    let param = "?cityName=" + cityName + "&hotelType=" + hotelType;
    return this.http.get<IHotel[]>('http://localhost:60200/api/user/GetHotelsByCityNameAndHotelType' + param).pipe(catchError(this.errorHandler));
  }

  GetCalculatedEstimateCost(hotelName: string, roomType: string, noOfRooms: number): Observable<number> {
    let param = "?hotelName=" + hotelName + "&roomType=" + roomType + "&numberOfRooms=" + noOfRooms;
    return this.http.get<number>('http://localhost:60200/api/user/GetCalculatedEstimateCostUsingAPI' + param).pipe(catchError(this.errorHandler));
  }

  AddAccomodation(accDetails: IAccomodation): Observable<number> {
    // var accDetails: IAccomodation;
    // accDetails = { AccomodationId: 0, BookingId: bookingId, HotelName: hotelName, City: city, NoOfRooms: noOfRooms, HotelRating: hotelRating, Price: price, RoomType: roomType }
    return this.http.post<number>('http://localhost:60200/api/User/AddAccommodationUsingAPI', accDetails).pipe(catchError(this.errorHandler));
  }

  ViewHotelDetails(): Observable<IViewHotel[]> {

    return this.http.get<IViewHotel[]>('http://localhost:60200/api/User/ViewHotelDetail').pipe(catchError(this.errorHandler));
  }


  addhotels(hotelName: string, hotelRating: number, singleRoomPrice: number, doubleRoomPrice: number, deluxeeRoomPrice: number,suiteRoomPrice: number,city: string,packageId: number): Observable<number> {
    var v: IHotel;
    v = {
      HotelId: 0,
      HotelName: hotelName,
      HotelRating: hotelRating,
      SingleRoomPrice: singleRoomPrice,
      DoubleRoomPrice: doubleRoomPrice,
      DeluxeeRoomPrice: deluxeeRoomPrice,
      SuiteRoomPrice: suiteRoomPrice,
      City: city,
      PackageId: packageId
    }
    return this.http.post<number>('http://localhost:60200/api/user/addhotels', v).pipe(catchError(this.errorHandler));
  }



  

  RentVehicle(rentObj: IVehicleBooked): Observable<number>
  {
      let tempVar = this.http.post<number> ('http://localhost:60200/api/user/rentvehicles', rentObj).pipe(catchError(this.errorHandler));
      return tempVar;
  }

  ViewVehicleDetails(): Observable<IViewVehicle[]> {
    let tempVar = this.http.get<IViewVehicle[]>
      ('http://localhost:60200/api/User/viewvehicle').
      pipe(catchError(this.errorHandler));
    return tempVar;
  }

  addvehicles(vehicleName: string, vehicleType: string, ratePerHour: number, ratePerKm: number, basePrice: number): Observable<number> {
    var v: IAddVehicle;
    v = {
      VehicleId: 0, VehicleType: vehicleType,
      VehicleName: vehicleName, RatePerHour: ratePerHour,
      RatePerKm: ratePerKm, BasePrice: basePrice
    }
    return this.http.post<number>('http://localhost:60200/api/user/addvehicles', v).pipe(catchError(this.errorHandler));
  }

  addRating(rating1: number, comments: string, bookingId: number) {
    var userObj: IRating;
    userObj = { rating1: rating1, comments: comments, bookingId: bookingId };
    return this.http.post<boolean>('http://localhost:60200/api/user/InsertBookingRating', userObj).pipe(catchError(this.errorHandler));
  }

  TotalPayment(bookingId: number): Observable<number> {

    return this.http.get<number>('http://localhost:60200/api/User/GetTotalPaymentUsingAPI?bookingId=' + bookingId).pipe(catchError(this.errorHandler));
  }

  PaymentStatusService(pay: IPayment): Observable<boolean> {

    return this.http.post<boolean>('http://localhost:60200/api/User/PaymentStatusUsingAPI', pay).pipe(catchError(this.errorHandler));
  }


  //getPackageId(city: string): Observable<number> {
  //  let param = "?city=" + city;
  //  return this.http.get<number>('http://localhost:60200/api/User/GetPackageIdByCity', param).pipe(catchError(this.errorHandler));
  //}

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
