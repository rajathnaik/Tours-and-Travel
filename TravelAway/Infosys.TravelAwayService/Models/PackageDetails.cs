using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infosys.TravelAwayService.Models
{
    public class PackageDetails
    {
        public int PackageDetailsId { get; set; }
        public int? PackageId { get; set; }
        public string PlacesToVisit { get; set; }
        public string Description { get; set; }
        public int NoOfDays { get; set; }
        public int NoOfNights { get; set; }
        public string Accomodation { get; set; }
        public decimal? PricePerAdult { get; set; }
    }
}
