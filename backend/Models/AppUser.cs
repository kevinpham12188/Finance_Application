using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class AppUser : IdentityUser
    {
        public List<Portfolio> portfolios{ get; set; } = new List<Portfolio>();
    }
}