﻿using Infosys.TravelAwayDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infosys.TravelAwayService.Models
{
    public class Employee
    {
        public int EmpId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public byte? RoleId { get; set; }
        public string EmailId { get; set; }

        public virtual Roles Role { get; set; }
    }
}
