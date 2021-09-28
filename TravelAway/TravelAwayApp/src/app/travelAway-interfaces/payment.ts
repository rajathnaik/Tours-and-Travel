export interface IPayment {
  paymentId: number;
  bookingId: number;
  totalAmount: number;
  paymentStatus: string;
}
