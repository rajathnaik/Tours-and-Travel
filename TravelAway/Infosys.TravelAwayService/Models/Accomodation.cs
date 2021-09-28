﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infosys.TravelAwayService.Models
{
    
        public class Accomodation
        {
            public int AccomodationId { get; set; }
            public int? BookingId { get; set; }
            public string HotelName { get; set; }
            public string City { get; set; }
            public int NoOfRooms { get; set; }
            public int? HotelRating { get; set; }
            public decimal? Price { get; set; }
            public string RoomType { get; set; }
        }
    
}
