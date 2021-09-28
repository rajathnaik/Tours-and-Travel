using System;
using System.Collections.Generic;

namespace TravelAway.DataAccessLayer.Models
{
    public partial class CustomerCare
    {
        public int RequestId { get; set; }
        public int BookingId { get; set; }
        public string QueryStatus { get; set; }
        public string CustQuery { get; set; }

        public virtual Booking Booking { get; set; }
    }
}
