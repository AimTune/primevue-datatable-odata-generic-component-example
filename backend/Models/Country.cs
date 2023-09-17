using System.ComponentModel.DataAnnotations.Schema;

namespace ODataExample.Models
{
    public class Country
    {
        [Column("COUNTRY_ID")]
        public string Id { get; set; }
        [Column("COUNTRY_NAME")]
        public string Name{ get; set; } = string.Empty;
        [Column("REGION_ID")]
        public virtual int RegionID { get; set; }
        public virtual Region Region { get; set; } = null!;
    }
}
