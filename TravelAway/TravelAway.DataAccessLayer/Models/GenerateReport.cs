using System;
using System.Collections.Generic;

namespace TravelAway.DataAccessLayer.Models
{
    public partial class GenerateReport
    {
        public int GenerateReportId { get; set; }
        public string CategoryId { get; set; }
        public int NumberOfPackages { get; set; }
        public string PackageId { get; set; }
        public int NumberOfBooking { get; set; }

        public virtual PackageCategories Category { get; set; }
        public virtual Packages Package { get; set; }
    }
}
