using System;
using System.Collections.Generic;

namespace Infosys.TravelAwayDAL.Models
{
    public partial class PackageCategory
    {
        public PackageCategory()
        {
            Package = new HashSet<Package>();
        }

        public int PackageCategoryId { get; set; }
        public string PackageCategoryName { get; set; }

        public virtual ICollection<Package> Package { get; set; }
    }
}
