using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Calculator.Services
{
    public class CalculatorService
    {
        public double? MakeCalc(string expression)
        {
            // if the division are two integers, the result will be a rounded integer if we do not cast to double
            expression = expression.Replace("/", "/(double)");

            var result = EvaluateFormulaAsync(expression).Result;
            return result;
        }

        static async Task<double> EvaluateFormulaAsync(string formula)
        {
            return await CSharpScript.EvaluateAsync<double>(formula,
                ScriptOptions.Default.WithImports("System.Math"));
        }
    }
}