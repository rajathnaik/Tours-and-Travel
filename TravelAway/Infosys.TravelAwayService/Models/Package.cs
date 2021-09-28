using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infosys.TravelAwayService.Models
{
    public class Package
    {
        public int PackageId { get; set; }
        public string PackageName { get; set; }
        public int? PackageCategoryId { get; set; }
        public string TypeOfPackage { get; set; }
    }
}
