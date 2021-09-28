using Infosys.TravelAwayDAL.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
namespace Infosys.TravelAwayDAL
{
    public class TravelAwayRepository
    {
        private TravelAwayDBContext Context { get; set; }

        public TravelAwayRepository()
        {
            Context = new TravelAwayDBContext();
        }


        //Register customer using LINQ
        public bool RegisterUserUsingLinq(Customer customer)
        {
            bool status;
            try
            {
                var role = (from rol in Context.Roles where rol.RoleName == "Customer" select rol).FirstOrDefault<Roles>();

                if (role != null)
                {
                    customer.Role = role;
                }
                else
                {
                    status = false;
                }
                Context.Customer.Add(customer);
                Context.SaveChanges();
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }

            return status;
        }


        public string[] ValidateUserCredentialsUsingLinq(string emailId, string password)
        {
            string[] roleName = new string[3];
            try
            {
                var objUser = (from usr in Context.Customer
                               where usr.EmailId == emailId && usr.UserPassword == password
                               select usr.Role).FirstOrDefault<Roles>();
                if (objUser != null)
                {
                    roleName[0] = objUser.RoleName;

                    roleName[1] = (from usr in Context.Customer
                                   where usr.EmailId == emailId && usr.UserPassword == password
                                   select usr.FirstName).FirstOrDefault();

                    roleName[2] = (from usr in Context.Customer
                                   where usr.EmailId == emailId && usr.UserPassword == password
                                   select usr.LastName).FirstOrDefault();
                }
                else
                {
                    roleName = null;
                }
            }
            catch (Exception)
            {
                roleName = null;
            }
            return roleName;
        }


        //employe login validation
        public string[] ValidateEmployeeCredentials(string emailId, string password)
        {
            string[] roleName = new string[3];
            try
            {
                var objUser = (from usr in Context.Employee
                               where usr.EmailId == emailId && usr.Password == password
                               select usr.Role).FirstOrDefault<Roles>();

                if (objUser != null)
                {
                    roleName[0] = objUser.RoleName;


                    roleName[1] = (from usr in Context.Employee
                                   where usr.EmailId == emailId && usr.Password == password
                                   select usr.FirstName).FirstOrDefault();

                    roleName[2] = (from usr in Context.Employee
                                   where usr.EmailId == emailId && usr.Password == password
                                   select usr.LastName).FirstOrDefault();
                }
                else
                {
                    roleName = null;
                }
            }
            catch (Exception)
            {
                roleName = null;
            }
            return roleName;
        }
        //edit profile
        public bool UpdateCustomerProfileUsingLinq(string emailId, string firstName, string lastName, string gender, decimal contact, DateTime dateOfBirth, string address)
        {
            bool status = false;
            Customer customer = null;
            try
            {
                customer = (from cust in Context.Customer where cust.EmailId == emailId select cust).FirstOrDefault<Customer>();
                if (customer != null)
                {
                    customer.FirstName = firstName;
                    customer.LastName = lastName;
                    customer.Gender = gender;
                    customer.ContactNumber = contact;
                    customer.DateOfBirth = dateOfBirth;
                    customer.Address = address;
                    Context.SaveChanges();
                    status = true;


                }
            }
            catch (Exception)
            {

                status = false;
            }
            return status;
        }
        //View all packages
        public List<Package> DisplayAllPackages()
        {
            List<Package> listPackages = new List<Package>();
            try
            {
                listPackages = (from c in Context.Package select c).ToList();
            }
            catch (Exception)
            {
                listPackages = null;
            }
            return listPackages;
        }


        //To Do: Implement appropriate logic and change the return statement as per your logic

        //view all packages by category
        public List<PackageDetails> DisplayAllPackageDetailsByCategory(int packageId)
        {
            List<PackageDetails> listPkgDetails = null;
            try
            {
                listPkgDetails = (from p in Context.PackageDetails where p.PackageId == packageId select p).ToList<PackageDetails>();
            }
            catch (Exception)
            {
                listPkgDetails = null;
            }
            return listPkgDetails;
        }


        public List<PackageCategory> GetPackageCategories()
        {
            List<PackageCategory> listPkgDetails = null;
            try
            {
                //SqlParameter prmPkgName = new SqlParameter("@pkgName", pkgName);
                listPkgDetails = (from p in Context.PackageCategory
                                  orderby p.PackageCategoryId
                                  ascending
                                  select p).ToList<PackageCategory>();
            }
            catch (Exception )
            {
                listPkgDetails = null;
            }
            return listPkgDetails;
        }

        //select accomodation
        //Select Accomodation 
        public int AddAccomodation(Accomodation accObj)
        {
            int returnVal = 0;
            SqlParameter prmBookingId = new SqlParameter("@bookingId", accObj.BookingId);
            SqlParameter prmCity = new SqlParameter("@city", accObj.City);
            SqlParameter prmHotelRating = new SqlParameter("@hotelRating", accObj.HotelRating);
            SqlParameter prmHotel = new SqlParameter("@hotel", accObj.HotelName);
            SqlParameter prmRoomType = new SqlParameter("@roomType", accObj.RoomType);
            SqlParameter prmNoOfRooms = new SqlParameter("@noOfRooms", accObj.NoOfRooms);
            SqlParameter prmEstimatedCost = new SqlParameter("@estimatedCost", accObj.Price);
            SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
            prmReturnResult.Direction = System.Data.ParameterDirection.Output;

            try
            {
                Context.Database.ExecuteSqlRaw("exec @ReturnResult = dbo.usp_AddAccommodation @bookingId, @city, @hotelRating, @hotel, @roomType, @noOfRooms, @estimatedCost", prmReturnResult, prmBookingId, prmCity, prmHotelRating, prmHotel, prmRoomType, prmNoOfRooms, prmEstimatedCost);
                returnVal = Convert.ToInt32(prmReturnResult.Value);
            }
            catch (Exception )
            {
                returnVal = -99;
            }
            return returnVal;
        }


        public int BookPackageUsingLinq(BookPackage book)
        {
            int status = 0;
            try
            {
                Context.BookPackage.Add(book);
                Context.SaveChanges();
                status = Context.BookPackage.OrderBy(b => b.BookingId).Select(b => b.BookingId).LastOrDefault();
            }
            catch (Exception)
            {

                status = -99;
            }

            return status;
        }



        public List<BookPackage> DisplayBookingDetails(string emailId)
        {
            List<BookPackage> lstbookings = null;
            try
            {

                lstbookings = (from p in Context.BookPackage
                               where p.EmailId == emailId
                               select p).ToList<BookPackage>();
            }
            catch (Exception )
            {
                lstbookings = null;
            }
            return lstbookings;
        }
        //accomodation

        public List<Hotel> GetHotelDetailsList()
        {
            List<Hotel> list = null;
            try
            {
                list = (from h in Context.Hotel
                        select h).ToList<Hotel>();

                return list;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return list;
            }
        }


        public int SelectAccomodationUsingLinq(Accomodation accObj)
        {
            int returnVal = 0;
            SqlParameter prmBookingId = new SqlParameter("@bookingId", accObj.BookingId);
            SqlParameter prmCity = new SqlParameter("@city", accObj.City);
            SqlParameter prmHotelRating = new SqlParameter("@hotelRating", accObj.HotelRating);
            SqlParameter prmHotel = new SqlParameter("@hotel", accObj.HotelName);
            SqlParameter prmRoomType = new SqlParameter("@roomType", accObj.RoomType);
            SqlParameter prmNoOfRooms = new SqlParameter("@noOfRooms", accObj.NoOfRooms);
            SqlParameter prmEstimatedCost = new SqlParameter("@estimatedCost", accObj.Price);
            SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
            prmReturnResult.Direction = System.Data.ParameterDirection.Output;

            try
            {
                Context.Database.ExecuteSqlRaw("exec @ReturnResult = dbo.usp_AddAccommodation @bookingId, @city, @hotelRating, @hotel, @roomType, @noOfRooms, @estimatedCost", prmReturnResult, prmBookingId, prmCity, prmHotelRating, prmHotel, prmRoomType, prmNoOfRooms, prmEstimatedCost);
                returnVal = Convert.ToInt32(prmReturnResult.Value);
            }
            catch (Exception)
            {
                returnVal = -99;
            }
            return returnVal;
        }
        public List<string> GetAllCityList()
        {
            List<string> cityList = null;
            try
            {
                cityList = (from h in Context.Hotel
                            select h.City).Distinct<string>().ToList<string>();

                return cityList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return cityList;
            }
        }

        public int getPackageIdByCity(string city)
        {
            int status = 0;
            try
            {
                status = Context.Package.Where(p => p.PackageName == city).Select(p => p.PackageId).FirstOrDefault();

            }
            catch (Exception)
            {
                status = -99;
            }
            return status;
        }
        public List<Hotel> GetHotelsByCityNameAndHotelType(string cityName, int hotelType)
        {
            List<Hotel> hotelList = null;
            try
            {
                if (cityName == "All" && hotelType == 0)
                {
                    hotelList = (from h in Context.Hotel
                                 select new Hotel()
                                 {
                                     HotelId = h.HotelId,
                                     HotelName = h.HotelName
                                 }
                                ).ToList<Hotel>();
                }
                else if (cityName != "All" && hotelType == 0)
                {
                    hotelList = (from h in Context.Hotel
                                 where h.City == cityName
                                 select new Hotel()
                                 {
                                     HotelId = h.HotelId,
                                     HotelName = h.HotelName
                                 }
                                ).ToList<Hotel>();
                }
                else if (cityName == "All" && hotelType != 0)
                {
                    hotelList = (from h in Context.Hotel
                                 where h.HotelRating == hotelType
                                 select new Hotel()
                                 {
                                     HotelId = h.HotelId,
                                     HotelName = h.HotelName
                                 }
                                ).ToList<Hotel>();
                }
                else if (cityName != "All" && hotelType != 0)
                {
                    hotelList = (from h in Context.Hotel
                                 where h.HotelRating == hotelType && h.City == cityName
                                 select new Hotel()
                                 {
                                     HotelId = h.HotelId,
                                     HotelName = h.HotelName
                                 }
                                ).ToList<Hotel>();
                }

                return hotelList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return hotelList;
            }
        }


        public decimal GetCalculatedEstimateCost(string hotelName, string roomType, int numberOfRooms)
        {
            decimal amount = 1;
            try
            {
                Hotel obj = (from h in Context.Hotel where h.HotelName == hotelName select h).Single();
                if (roomType == "single")
                {
                    amount = (decimal)(numberOfRooms * obj.SingleRoomPrice);
                }
                else if (roomType == "double")
                {
                    amount = (decimal)(numberOfRooms * obj.DoubleRoomPrice);
                }
                else if (roomType == "deluxe")
                {
                    amount = (decimal)(numberOfRooms * obj.DeluxeeRoomPrice);
                }
                else if (roomType == "suite")
                {
                    amount = (decimal)(numberOfRooms * obj.SuiteRoomPrice);
                }
                else
                {
                    return 0;
                }

                return amount;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return amount;
            }

        }


        //customer care


        //customer care
        public bool CustomerCareDetails(int bookingId, string queryStatus, string query, string assignee, string queryAnswer)
        {
            bool status = false;
            CustomerCare c = new CustomerCare();
            c.BookingId = bookingId;
            c.QueryStatus = queryStatus;
            c.Query = query;
            c.Assignee = assignee;
            c.QueryAnswer = queryAnswer;

            try
            {
                Context.CustomerCare.Add(c);
                Context.SaveChanges();
                status = true;
            }
            catch (Exception )
            {
                status = false;
            }
            return status;
        }
        // get customer care by booking id
        public int GetCustomerCareBookingId(string emailId)
        {
            try
            {
                var bookingId = Context.BookPackage.OrderBy(b => b.BookingId).Where(b => b.EmailId == emailId).Select(b => b.BookingId).LastOrDefault();
                return bookingId;
            }
            catch (Exception)
            {
                return -99;
            }
        }


        public int addhotels(Hotel hotel)
        {
            int result;
            try
            {
                Context.Hotel.Add(hotel);
                Context.SaveChanges();
                result = Context.Hotel.
                    OrderBy(v => v.HotelId).
                    Select(bkId => bkId.HotelId).LastOrDefault();
            }
            catch (Exception)
            {

                result = 0;
            }

            return result;
        }

        public List<Hotel> viewHotelDetails()
        {
            var hotel = new List<Hotel>();
            try
            {
                hotel = (from h in Context.Hotel select h).
                    ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                hotel = null;
            }
            return hotel;
        }



        public List<Vehicle> viewVehicleDetails()
        {
            var vehicle = new List<Vehicle>();
            try
            {
                vehicle = (from v in Context.Vehicle select v).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                vehicle = null;
            }
            return vehicle;

        }
        public int rentvehicle(VehicleBooked vb)
        {
            int result;
            try
            {
                Context.VehicleBooked.Add(vb);
                Context.SaveChanges();
                result = Context.VehicleBooked.
                    OrderBy(v => v.VehicleBookingId).
                    Select(bkId => bkId.VehicleBookingId).
                    LastOrDefault();
            }
            catch (Exception)
            {

                result = 0;
            }

            return result;
        }

        public int addvehicles(Vehicle vehicle)
        {
            int result;
            try
            {
                Context.Vehicle.Add(vehicle);
                Context.SaveChanges();
                result = Context.Vehicle.
                    OrderBy(v => v.VehicleId).
                    Select(bkId => bkId.VehicleId).LastOrDefault();
            }
            catch (Exception)
            {

                result = 0;
            }

            return result;
        }
        //add rating
        public bool AddRatings(Models.Rating rating)
        {
            bool status = false;
            try
            {
                Rating ratingObj = new Rating();
                ratingObj.RatingId = rating.RatingId;
                ratingObj.Comments = rating.Comments;
                ratingObj.Rating1 = rating.Rating1;
                ratingObj.BookingId = rating.BookingId;
                Context.Rating.Add(ratingObj);
                Context.SaveChanges();
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public int TotalPaymentUsingLinq(int bookingId)
        {
            int totalPay = 0;
            SqlParameter prmBookingId = new SqlParameter("@bookingId", bookingId);

            SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
            prmReturnResult.Direction = System.Data.ParameterDirection.Output;

            try
            {
                Context.Database.ExecuteSqlRaw("exec @ReturnResult = dbo.usp_bookingCost @bookingId", prmReturnResult, prmBookingId);
                totalPay = Convert.ToInt32(prmReturnResult.Value);
            }
            catch (Exception)
            {
                totalPay = -99;
            }
            return totalPay;
        }

        public bool PaymentStatusUsingLinq(Payment payment)
        {
            bool status;
            try
            {
                Payment pay = new Payment();

                pay.PaymentId = payment.PaymentId;
                pay.BookingId = payment.BookingId;
                pay.TotalAmount = payment.TotalAmount;
                pay.PaymentStatus = payment.PaymentStatus;

                Context.Payment.Add(payment);
                Context.SaveChanges();
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }

            return status;
        }
    }
}
