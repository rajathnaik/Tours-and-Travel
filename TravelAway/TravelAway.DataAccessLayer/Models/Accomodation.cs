using System;
using System.Collections.Generic;

namespace TravelAway.DataAccessLayer.Models
{
    public partial class Accomodation
    {
        public int AccomodationId { get; set; }
        public int? BookingId { get; set; }
        public string EmailId { get; set; }
        public string City { get; set; }
        public string HotelName { get; set; }
        public string HotelRating { get; set; }
        public string RoomType { get; set; }
        public int NoOfRooms { get; set; }
        public int EstimatedCost { get; set; }

        public virtual Booking Booking { get; set; }
        public virtual Customer Email { get; set; }
    }
}
