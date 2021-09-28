using System;
using System.Collections.Generic;

namespace TravelAway.DataAccessLayer.Models
{
    public partial class VehicleRent
    {
        public int VehicleRentId { get; set; }
        public int BookingId { get; set; }
        public string VehicleName { get; set; }
        public string VehicleType { get; set; }
        public DateTime BookingDate { get; set; }
        public TimeSpan PickupTime { get; set; }
        public int NoOfHours { get; set; }
        public int NoOfKms { get; set; }
        public decimal Cost { get; set; }

        public virtual Booking Booking { get; set; }
    }
}
