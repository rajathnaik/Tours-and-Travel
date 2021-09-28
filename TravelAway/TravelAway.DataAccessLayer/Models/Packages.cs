using System;
using System.Collections.Generic;

namespace TravelAway.DataAccessLayer.Models
{
    public partial class Packages
    {
        public Packages()
        {
            Booking = new HashSet<Booking>();
            GenerateReport = new HashSet<GenerateReport>();
        }

        public string PackageId { get; set; }
        public string PackageCategory { get; set; }
        public string PackageName { get; set; }
        public string CategoryId { get; set; }
        public string PackageDesc { get; set; }

        public virtual PackageCategories Category { get; set; }
        public virtual ICollection<Booking> Booking { get; set; }
        public virtual ICollection<GenerateReport> GenerateReport { get; set; }
    }
}
