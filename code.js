const resultDisplay = document.querySelector("#display div");
const operatorKeys = document.querySelectorAll(".operator:not(.equals)");
const addKey = document.querySelector(".add");
const subtractKey = document.querySelector(".subtract");
const multiplyKey = document.querySelector(".multiply");
const divideKey = document.querySelector(".divide");
// TBC regex. 
const regex = /^(?=.{1,7}$)-?\d+(\d$|[.]?\d*$)/;
const displayLength = 7;

let inputString = "";
let currentOperator = null;
let previousOperator = null;
let currentOperatorKey = null;
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
    clearSelectedOperatorKey();
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

const setOperator = function(e) {
    if (operandA === 0) {
        operandA = inputString * 1;
        inputString = "";
    } 
    else if (inputString != "") {
        equals();
        operandB = 0;
    }
    currentOperator = e.currentTarget.textContent;
    if (currentOperatorKey != e.currentTarget)
        clearSelectedOperatorKey();
    e.currentTarget.classList.add("selected");
    currentOperatorKey = e.currentTarget;
}

const clearSelectedOperatorKey = function() {
    if (currentOperatorKey != null) {
        currentOperatorKey.classList.remove("selected");
        currentOperatorKey = null;
    }
}

const calculate = function(operator, a, b) {
    switch(operator) {
        case "+":
            return a += b;
        case "-":
            return a -= b;
        case "*":
            return a *= b;
        case "/":
            if (b === 0) {
                return("don't...");
            } else
                return a /= b;
    }
}

const equals = function() {
    operandB = inputString * 1;
    if (currentOperator != null) {
        operandA = calculate(currentOperator, operandA, operandB);
        previousOperator = currentOperator;
        previousOperandB = operandB;
        currentOperator = null;
        clearSelectedOperatorKey();
    }
    else if (previousOperator != null) {
        operandA = calculate(previousOperator, operandA, previousOperandB);
    }
    // Disable backspace so user cannot delete digits of result. Will be enabled when user starts entering a new operand.
    isBackspaceEnabled = false;
    inputString = ""; 
    displayOutput(operandA);
}

// Using event listeners instead of inline html functions as these give access to the element that triggered the event.
// So we can change the class of the element that has the event listener attached. 
addKey.addEventListener("click", setOperator);
subtractKey.addEventListener("click", setOperator);
multiplyKey.addEventListener("click", setOperator);
divideKey.addEventListener("click", setOperator);