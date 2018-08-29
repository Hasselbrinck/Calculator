using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Calculator;
using Calculator.Controllers;
using System.Web.Http.Hosting;
using System.Net;

namespace Calculator.Tests.Controllers
{
    [TestClass]
    public class ValuesControllerTest
    {
        [TestMethod]
        public void CalculateSumOnApi()
        {
            ValuesController controller = new ValuesController
            {
                Request = new HttpRequestMessage()
                {
                    Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
                }
            };
            var response = controller.Calculate(new Models.CalcModel
            {
                 expression = "3+5"
            });
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }
        [TestMethod]
        public void Return_BadRequestForInvalidSyntaxApi()
        {
            ValuesController controller = new ValuesController
            {
                Request = new HttpRequestMessage()
                {
                    Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
                }
            };
            var response = controller.Calculate(new Models.CalcModel
            {
                expression = "3+"
            });
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}
