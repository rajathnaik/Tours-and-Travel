using System;
using System.Collections.Generic;

namespace TravelAway.DataAccessLayer.Models
{
    public partial class Rating
    {
        public int RatingId { get; set; }
        public string EmailId { get; set; }
        public int BookingId { get; set; }
        public string ReviewRating { get; set; }
        public string Comments { get; set; }

        public virtual Booking Booking { get; set; }
    }
}
