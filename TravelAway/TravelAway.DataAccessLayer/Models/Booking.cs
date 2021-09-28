using System;
using System.Collections.Generic;

namespace TravelAway.DataAccessLayer.Models
{
    public partial class Booking
    {
        public Booking()
        {
            Accomodation = new HashSet<Accomodation>();
            CustomerCare = new HashSet<CustomerCare>();
            Payment = new HashSet<Payment>();
            Rating = new HashSet<Rating>();
            VehicleRent = new HashSet<VehicleRent>();
        }

        public string EmailId { get; set; }
        public string PackageId { get; set; }
        public string Place { get; set; }
        public int BookingId { get; set; }
        public decimal ContactNo { get; set; }
        public string ResidentialAddress { get; set; }
        public DateTime? DateOfBooking { get; set; }
        public DateTime? DateOfTravel { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public string BookingStatus { get; set; }

        public virtual Packages Package { get; set; }
        public virtual ICollection<Accomodation> Accomodation { get; set; }
        public virtual ICollection<CustomerCare> CustomerCare { get; set; }
        public virtual ICollection<Payment> Payment { get; set; }
        public virtual ICollection<Rating> Rating { get; set; }
        public virtual ICollection<VehicleRent> VehicleRent { get; set; }
    }
}
