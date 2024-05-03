using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SahibGameStore.Domain
{
    public class Filtrate
    {
        public float minPrice { get; set; } = 0;

        public float maxPrice { get; set; } = float.MaxValue;


        public Guid? CompanyId { get; set; }


        public Guid? PlatformId { get; set; }

        public Guid? GenreId { get; set; }


    }
}
