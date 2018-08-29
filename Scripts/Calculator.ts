/// <reference path="typings/jquery.d.ts" />

namespace Redia.Calculator {
    export class Tools {
        // this function is called at startup in order to fire up the web api function as it takes seconds first time it's called
        static HandleOnload(): void {
            $.ajax({
                type: 'POST',
                url: "Calculator/api/calc",
                contentType: "application/json",
                data: JSON.stringify({
                    "expression": "1+1"
                }),
                success: (response) => {
                    console.log("Init done");
                },
                error: (e) => {
                    console.log("e: ", e);
                }
            } as JQueryAjaxSettings);
        }
        // general onclick input function
        static HandleInput(label: string): void {
            switch (label) {
                case "=": {
                    let calcStr = $("#calcOutput").val();
                    $("#calcOutput").val("");
                    if (calcStr != "") {
                        $.ajax({
                            type: 'POST',
                            url: "Calculator/api/calc",
                            contentType: "application/json",
                            data: JSON.stringify({
                                "expression": calcStr
                            }),
                            success: (response) => {
                                $("#calcOutput").val(response);
                            },
                            error: (e) => {
                                console.log("e: ", e);
                            }
                        } as JQueryAjaxSettings);
                    }
                    break;
                }
                case "SQRT": {
                    let curVal = $("#calcOutput").val();
                    if (curVal.length == 0) return;
                    let lastChar = curVal.substring(curVal.length - 1, curVal.length);
                    var sqrVal;
                    if ('0123456789'.indexOf(lastChar) == -1) return;
                    var i: number;
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
                    let curVal = $("#calcOutput").val();
                    if (curVal.length == 0) return;
                    let lastChar = curVal.substring(curVal.length - 1, curVal.length);
                    if ('0123456789)'.indexOf(lastChar) == -1) return;
                    $("#calcOutput").val(curVal + "*");
                    break;
                }
                case "-":
                case "/":
                case "+": {
                    let curVal = $("#calcOutput").val();
                    if (curVal.length == 0) return;
                    let lastChar = curVal.substring(curVal.length - 1, curVal.length);
                    if ('0123456789)'.indexOf(lastChar) == -1) return;
                    $("#calcOutput").val(curVal + label);
                    break;
                }
                case "CE": {
                    let curVal = $("#calcOutput").val();
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
                    let curVal = $("#calcOutput").val();
                    let lastChar = curVal.substring(curVal.length - 1, curVal.length);
                    if (lastChar == ')') return;

                    $("#calcOutput").val(curVal + label);
                    break;
                }
            }
        }
    }
}