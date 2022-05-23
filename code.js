const resultDisplay = document.querySelector("#display div");
// TBC regex. 
const regex = /^(?=.{1,10}$)\d+(\d$|[.]?\d*$)/;

let inputString = "";
let operator = null;
let previousOperator = null;
// When ready, the input string will be converted into operands of type number. 
let operandA = null;
let operandB = null;
let total = null;

const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

const clearData = function() {
    inputString = "";
    operandA = null;
    operandB = null;
    operator = null;
    displayOutput("0");
}

const displayOutput = function(output) {
    resultDisplay.textContent = output;
}

const toggleNegativeInput = function() {
    if (inputString != "") {
        inputString *= -1;
        displayOutput(inputString);
    }
}

const backspace = function() { 
    if (inputString.length < 2) {
        inputString = "";
        displayOutput("0");
    } else {
        inputString = inputString.slice(0, inputString.length - 1);
        displayOutput(inputString);
    }
}

const numericInput = function(s) {
    // Will input as a string so can check against regex. 
    let newInputString = `${inputString}${s}`;
    if (regex.test(newInputString))
        inputString = newInputString; 
    displayOutput(inputString);
}

const setOperator = function(operationName) {

}

const calculate = function() {

}