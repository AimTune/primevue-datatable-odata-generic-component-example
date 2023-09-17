using Linquest.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using ODataExample.Data;
using ODataExample.Models;

namespace ODataExample.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountriesController : ODataController
    {
        private readonly ODataExampleContext _context;

        public CountriesController(ODataExampleContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery]
        public IQueryable<Country> Get()
        {
            return _context.Countries;
        }
    }
}