using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TravelAway.DataAccessLayer.Models;

namespace TravelAway.DataAccessLayer
{
    public class TravelAwayRepository
    {
        private TravelAwayDBContext context;

        public TravelAwayDBContext Context { get { return context; } }

        public TravelAwayRepository(TravelAwayDBContext dbContext)
        {
            context = dbContext;
        }
        public TravelAwayRepository()
        {
            context = new TravelAwayDBContext();
        }

        //All the GET/Fetch methods 
        #region Get Package Categories List
        public List<PackageCategories> GetPackageCategories()
        {

            List<PackageCategories> categoryList = context.PackageCategories.ToList();

            return categoryList;

        }
        #endregion

        #region Get Package Details By Category ID
        public PackageCategories GetPackageDetailsByCatgeoryId(string categoryId)
        {
            PackageCategories pkg = new PackageCategories();
            try
            {
                pkg = context.PackageCategories.Find(categoryId);

            }
            catch (Exception)
            {

                pkg = null;
            }
            return pkg;
        }
        #endregion

        #region Get All Packages 
        public List<Packages> GetPackages()
        {
            List<Packages> packageList = context.Packages.ToList();
            return packageList;
        }
        #endregion

        #region Get Hotels
        public List<Hotels> GetHotels()
        {
            List<Hotels> hotelList = context.Hotels.ToList();
            return hotelList;

        }
        #endregion

        #region Get Hotels By City
        public HashSet<string> getHotelByCity()
        {
            List<string> hotelList = new List<string>();
            HashSet<string> hotel = new HashSet<string>();
            hotelList = context.Hotels.Select(pkg => pkg.City).ToList();
            foreach (var item in hotelList)
            {
                hotel.Add(item);
            }
            return hotel;
        }
        #endregion

        #region Get Vehicles
        public List<Vehicles> GetVehicles()
        {
            List<Vehicles> vehicleList = context.Vehicles.ToList();
            return vehicleList;
        }
        #endregion

        #region Get Bookings
        public List<Booking> GetBookings(string emailId)
        {
            List<Booking> bookingList = context.Booking.Where(a => a.EmailId == emailId).ToList();
            return bookingList;
        }
        #endregion

        //All the POST/AddData methods



    }
}
