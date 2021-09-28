export interface ICustomer {
  emailId: string,
  userPassword: string,
  firstName?: string,
  lastName?:string,
  roleId?: number,
  gender?: string,
  contactNumber?: number;
  dateOfBirth?: Date,
  address?: string
}

