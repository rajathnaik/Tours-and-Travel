import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayment } from '../travelAway-interfaces/payment';
import { UserService } from '../travelAway-services/user-service/user.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  userRole: string;
  userName: string;
  msg: string;
  bookingId: number;
  totalCost: number;
  responsePay: number;
  payStatus: string;
  estimatedCost: number;
  payConfirmation: boolean;
  errorMsg: string;

  constructor(private route: ActivatedRoute, private _UserService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getPaymentAmount();
    this.userRole = sessionStorage.getItem('userRole')
    this.userName = sessionStorage.getItem('userName')
    this.bookingId = parseInt(this.route.snapshot.params['bookingId']);
    this.estimatedCost = parseInt(this.route.snapshot.params['estimatedCost']);
    //this.totalCost = parseInt(this.route.snapshot.params['totalCost']);
    console.log(this.bookingId, this.estimatedCost);



  }
  submitPaymentForm(paymentForm) {

    this.getPaymentAmount();

    this.bookingId = parseInt(this.route.snapshot.params['bookingId']);
    //this.totalCost = this.route.snapshot.params['totalCost'];
    this.payStatus = "confirmed";

    let pay: IPayment;
    pay = { paymentId: 0, bookingId: this.bookingId, totalAmount: this.totalCost, paymentStatus: "Confirmed" }

    this._UserService.PaymentStatusService(pay).subscribe(

      resposnePayConfirmation => {
        this.payConfirmation = resposnePayConfirmation;
        if (this.payConfirmation) {
          console.log(this.totalCost)
          console.log(this.estimatedCost)
          //console.log(responsePayment)
          if (confirm("Payment Successfull")) {
            this.router.navigate(['/home']);
          }

          else {
            alert("Please Try Again");
          }

        }

      },

      responsePayErrorConfirmation => {
        this.payConfirmation = null;
        this.errorMsg = responsePayErrorConfirmation
        console.log("Unable to Complete Payment", this.errorMsg)

      },

      () => ("Payment Method Executed")

    )

  }
  getPaymentAmount() {
    //console.log(this.estimatedCost)

    this.bookingId = parseInt(this.route.snapshot.params['bookingId']);

    this._UserService.TotalPayment(this.bookingId).subscribe(

      responsePayment => {
        this.responsePay = responsePayment
        this.totalCost = this.responsePay + this.estimatedCost;
        //console.log(this.totalCost)
        //console.log(this.estimatedCost)
        //console.log(responsePayment)
        console.log("here")
      },
      responseError => {
        this.totalCost = 0;
        console.log("error recieving info")
      },
      () => ("Payment Method Executed")

    )
  }

  CancelRequest() {
    console.log("Cancel button clicked");
    alert("Accomodation Cancelled !\n Redirecting ...");
    this.router.navigate(['/packages'])
  }

}
