const resultDisplay = document.querySelector("#display div");
// TBC regex. 
const regex = /^(?=.{1,10}$)-?\d+(\d$|[.]?\d*$)/;

let inputString = "";
let currentOperator = null;
let previousOperator = null;
// When ready, the input string will be converted into operands of type number. 
let operandA = 0;
let operandB = 0;
let previousOperandB = 0;

let isBackspaceEnabled = true;

const clearData = function() {
    inputString = "";
    operandA = 0;
    operandB = 0;
    currentOperator = null;
    lastOperator = null;
    isBackspaceEnabled = true;
    displayOutput("0");
}

const displayOutput = function(output) {
    resultDisplay.textContent = output;
}

const toggleNegativeInput = function() {
    if (inputString != "") {
        // Make sure once inputString's sign is reversed, turn back into string
        // as numericInput() and backspace() expect strings, not numbers. 
        inputString = (inputString * -1).toString();
        displayOutput(inputString);
    }
}

const backspace = function() { 
    if (isBackspaceEnabled) {
        inputString = inputString.slice(0, inputString.length - 1);
        if (inputString === "-" || inputString.length < 1) {
            inputString = "";
            displayOutput("0");
        } else {
            displayOutput(inputString);
        }
    }
}

const numericInput = function(s) {
    isBackspaceEnabled = true;
    // Will input as a string so can check against regex. 
    let newInputString = `${inputString}${s}`;
    if (regex.test(newInputString))
        inputString = newInputString; 
    displayOutput(inputString);
}

const setOperator = function(operator) {
    if (operandA === 0) {
        operandA = inputString * 1;
        inputString = "";
    } 
    else if (inputString != "") {
        equals();
        operandB = 0;
    }
    currentOperator = operator;
}

const calculate = function(operator, a, b) {
    switch(operator) {
        case "ADD":
            return a += b;
        case "SUBTRACT":
            return a -= b;
        case "MULTIPLY":
            return a *= b;
        case "DIVIDE":
            return a /= b;
    }
}

const equals = function() {
    operandB = inputString * 1;
    if (operandB != 0 && currentOperator != null) {
        operandA = calculate(currentOperator, operandA, operandB);
        previousOperator = currentOperator;
        previousOperandB = operandB;
        currentOperator = null;
    }
    else if (previousOperator != null) {
        operandA = calculate(previousOperator, operandA, previousOperandB);
    }
    // Disable backspace so user cannot delete digits of result. Will be enabled when user starts entering a new operand.
    isBackspaceEnabled = false;
    inputString = ""; 
    displayOutput(operandA);
}