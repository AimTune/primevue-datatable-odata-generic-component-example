using Microsoft.EntityFrameworkCore;
using ODataExample.Models;

namespace ODataExample.Data
{
    public class ODataExampleContext : DbContext
    {
        public ODataExampleContext (DbContextOptions<ODataExampleContext> options)
            : base(options)
        {
        }

        public DbSet<Region> Regions { get; set; } = default!;
        public DbSet<Country> Countries { get; set; } = default!;
    }
}
