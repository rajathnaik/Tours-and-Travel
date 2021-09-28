using System;
using System.Collections.Generic;

namespace TravelAway.DataAccessLayer.Models
{
    public partial class Vehicles
    {
        public int VehicleId { get; set; }
        public string VehicleName { get; set; }
        public string VehicleType { get; set; }
        public decimal RatePerHour { get; set; }
        public decimal RatePerKm { get; set; }
    }
}
