using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using DomainModel;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Http;

namespace OneToOne.Controllers
{
    [BreezeController]
    public class DefaultController : ApiController
    {
        private EFContextProvider<MyDbContext> _contextProvider = new EFContextProvider<MyDbContext>();

        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

        [HttpGet]
        public IEnumerable<RequestHeader> RequestHeaders()
        {
            return _contextProvider.Context.RequestHeaders.Include("EaRequest");
        }

        [HttpGet]
        public IEnumerable<EaRequest> EaRequests()
        {
            return _contextProvider.Context.EaRequests;
        }
    }
}
