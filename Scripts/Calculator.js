/// <reference path="typings/jquery.d.ts" />
var Redia;
(function (Redia) {
    var Calculator;
    (function (Calculator) {
        var Tools = (function () {
            function Tools() {
            }
            // this function is called at startup in order to fire up the web api function as it takes seconds first time it's called
            Tools.HandleOnload = function () {
                $.ajax({
                    type: 'POST',
                    url: "Calculator/api/calc",
                    contentType: "application/json",
                    data: JSON.stringify({
                        "expression": "1+1"
                    }),
                    success: function (response) {
                        console.log("Init done");
                    },
                    error: function (e) {
                        console.log("e: ", e);
                    }
                });
            };
            // general onclick input function
            Tools.HandleInput = function (label) {
                switch (label) {
                    case "=": {
                        var calcStr = $("#calcOutput").val();
                        $("#calcOutput").val("");
                        if (calcStr != "") {
                            $.ajax({
                                type: 'POST',
                                url: "Calculator/api/calc",
                                contentType: "application/json",
                                data: JSON.stringify({
                                    "expression": calcStr
                                }),
                                success: function (response) {
                                    $("#calcOutput").val(response);
                                },
                                error: function (e) {
                                    console.log("e: ", e);
                                }
                            });
                        }
                        break;
                    }
                    case "SQRT": {
                        var curVal = $("#calcOutput").val();
                        if (curVal.length == 0)
                            return;
                        var lastChar = curVal.substring(curVal.length - 1, curVal.length);
                        var sqrVal;
                        if ('0123456789'.indexOf(lastChar) == -1)
                            return;
                        var i;
                        for (i = curVal.length; i >= 0; i--) {
                            if ('0123456789.'.indexOf(curVal.charAt(i)) == -1 || i == 0) {
                                sqrVal = curVal.substring(i, curVal.length);
                                curVal = curVal.substring(0, i - 1) + "Sqrt(" + sqrVal + ")";
                                break;
                            }
                        }
                        $("#calcOutput").val(curVal);
                        break;
                    }
                    case "X": {
                        var curVal = $("#calcOutput").val();
                        if (curVal.length == 0)
                            return;
                        var lastChar = curVal.substring(curVal.length - 1, curVal.length);
                        if ('0123456789)'.indexOf(lastChar) == -1)
                            return;
                        $("#calcOutput").val(curVal + "*");
                        break;
                    }
                    case "-":
                    case "/":
                    case "+": {
                        var curVal = $("#calcOutput").val();
                        if (curVal.length == 0)
                            return;
                        var lastChar = curVal.substring(curVal.length - 1, curVal.length);
                        if ('0123456789)'.indexOf(lastChar) == -1)
                            return;
                        $("#calcOutput").val(curVal + label);
                        break;
                    }
                    case "CE": {
                        var curVal = $("#calcOutput").val();
                        if (curVal != "") {
                            curVal = curVal.substring(0, curVal.length - 1);
                            $("#calcOutput").val(curVal);
                        }
                        break;
                    }
                    case "C": {
                        $("#calcOutput").val("");
                        break;
                    }
                    default: {
                        var curVal = $("#calcOutput").val();
                        var lastChar = curVal.substring(curVal.length - 1, curVal.length);
                        if (lastChar == ')')
                            return;
                        $("#calcOutput").val(curVal + label);
                        break;
                    }
                }
            };
            return Tools;
        }());
        Calculator.Tools = Tools;
    })(Calculator = Redia.Calculator || (Redia.Calculator = {}));
})(Redia || (Redia = {}));
//# sourceMappingURL=Calculator.js.map