using System;
using System.Collections.Generic;

namespace TravelAway.DataAccessLayer.Models
{
    public partial class Hotels
    {
        public int HotelId { get; set; }
        public string HotelName { get; set; }
        public string HotelRating { get; set; }
        public decimal SingleRoomPrice { get; set; }
        public decimal DoubleRoomPrice { get; set; }
        public decimal DeluxeRoomPrice { get; set; }
        public decimal SuitePrice { get; set; }
        public string City { get; set; }
    }
}
