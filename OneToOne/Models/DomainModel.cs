using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;

namespace DomainModel
{
    public class RequestHeader
    {
        [Key]
        public int Id { get; set; }

        public EaRequest EaRequest { get; set; }

        public string Name { get; set; }
    }

    public class EaRequest
    {
        [Key]
        [ForeignKey(nameof(RequestHeader))]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; } 

        public RequestHeader RequestHeader { get; set; }

        public string Name { get; set; }
    }

    public class MyDbContext : DbContext
    {
        static MyDbContext()
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<MyDbContext>());
        }

        public DbSet<RequestHeader> RequestHeaders { get; set; }
        public DbSet<EaRequest> EaRequests { get; set; }
    }

}