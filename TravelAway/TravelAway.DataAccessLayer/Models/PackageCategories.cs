using System;
using System.Collections.Generic;

namespace TravelAway.DataAccessLayer.Models
{
    public partial class PackageCategories
    {
        public PackageCategories()
        {
            GenerateReport = new HashSet<GenerateReport>();
            Packages = new HashSet<Packages>();
        }

        public string CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int VisitDays { get; set; }

        public virtual ICollection<GenerateReport> GenerateReport { get; set; }
        public virtual ICollection<Packages> Packages { get; set; }
    }
}
