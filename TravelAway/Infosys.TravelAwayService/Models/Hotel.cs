using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infosys.TravelAwayService.Models
{
    public class Hotel
    {
        public int HotelId { get; set; }
        public string HotelName { get; set; }
        public int HotelRating { get; set; }
        public decimal? SingleRoomPrice { get; set; }
        public decimal? DoubleRoomPrice { get; set; }
        public decimal? DeluxeeRoomPrice { get; set; }
        public decimal? SuiteRoomPrice { get; set; }
        public string City { get; set; }
        public int? PackageId { get; set; }
    }
}
