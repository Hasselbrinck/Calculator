using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Calculator.Services;

namespace Calculator.Tests.Services
{
    [TestClass]
    public class CalculatorServiceTest
    {
        CalculatorService calculatorService;

        [TestInitialize]
        public void InitializeTest()
        {
            calculatorService = new CalculatorService();
        }

        [TestMethod]
        public void TestSum()
        {
            var res = calculatorService.MakeCalc("4+7");
            Assert.AreEqual(res, 11);
        }
        [TestMethod]
        public void TestMinus()
        {
            var res = calculatorService.MakeCalc("4-7");
            Assert.AreEqual(res, -3);
        }
        [TestMethod]
        public void TestMultiply()
        {
            var res = calculatorService.MakeCalc("3*4");
            Assert.AreEqual(res, 12);
        }
        [TestMethod]
        public void TestDecimalDivision()
        {
            var res = calculatorService.MakeCalc("5/2");
            Assert.AreEqual(res, 2.5);
        }
        [TestMethod]
        public void TestSqrt()
        {
            var res = calculatorService.MakeCalc("Sqrt(16)");
            Assert.AreEqual(res, 4);
        }
        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void TestException()
        {
            var res = calculatorService.MakeCalc("5 *");
            Assert.Fail();
        }
    }
}
