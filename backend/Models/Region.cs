using System.ComponentModel.DataAnnotations.Schema;

namespace ODataExample.Models
{
    public class Region
    {
        [Column("REGION_ID")]
        public int Id { get; set; }
        [Column("REGION_NAME")]
        public string Name{ get; set; } = string.Empty;
    }
}
