using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infosys.TravelAwayService.Models
{
    public class Rating
    {
        public int RatingId { get; set; }
        public string Comments { get; set; }
        public int? Rating1 { get; set; }
        public int? BookingId { get; set; }
    }
}
