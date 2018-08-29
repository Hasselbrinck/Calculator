using Calculator.Models;
using Calculator.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Calculator.Controllers
{
    public class ValuesController : ApiController
    {
        private CalculatorService calculatorService;

        public ValuesController()
        {
            calculatorService = new CalculatorService();
        }

        // POST api/calc
        [HttpPost]
        [AcceptVerbs("POST")]
        [Route("api/calc")]
        public HttpResponseMessage Calculate(CalcModel data)
        {
            try
            {
                double? res = calculatorService.MakeCalc(data.expression);
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "The calculation failed. The expression may be invalid. " + e.ToString());
            }
        }
    }
}
