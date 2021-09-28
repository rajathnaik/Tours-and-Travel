using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelAway.DataAccessLayer;

namespace TravelAwayWebServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PackageController : Controller
    {
        TravelAwayRepository repository;
        public PackageController()
        {
            repository = new TravelAwayRepository();
        }

        [HttpGet]
        public JsonResult GetPackages()
        {
            List<TravelAway.DataAccessLayer.Models.Packages> OldPackage = new List<TravelAway.DataAccessLayer.Models.Packages>();
            try
            {
                OldPackage = repository.GetPackages();
            }
            catch (Exception)
            {

                OldPackage = null;
            }
            return Json(OldPackage);
        }

        [HttpGet]
        public JsonResult PackageCategory()
        {
            List<TravelAway.DataAccessLayer.Models.PackageCategories> categoryList = new List<TravelAway.DataAccessLayer.Models.PackageCategories>();
            try
            {
                categoryList = repository.GetPackageCategories();

            }
            catch (Exception)
            {

                categoryList = null;
            }
            return Json(categoryList);
        }
    }
}
