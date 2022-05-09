const resultDisplay = document.querySelector("#calc-result div");
const regex = /^(?=.{1,15}$)\d+(\d$|[.]?\d*$)/;

// Operator is a string that identifies what we'll do with the operands. 
let inputString = "";
let operator = null;
let operandA = null;
let operandB = null;

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

const modulus = function(a, b) {
    return a % b;
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

const numericInput = function(s) {
    // Will input as a string so can check against regex. 
    let newInputString = `${inputString}${s}`;
    if (regex.test(newInputString))
        inputString = newInputString; 
    displayOutput(inputString);
}

const setOperator = function(operationName) {
    // operandA has been set by user, if not carried over from last operation. 
    if (operandA === null)
        operandA = inputString;
        inputString = "";
    // An operator has been selected.
    operator = operationName; 
    // Then user will enter operandB. 
}

const calculate = function() {
    // Multiplying by 1 will cast string type into number type.
    operandA = operandA * 1;
    operandB = inputString * 1;
    inputString = "";
    // Switch(operator) and calculate with operandA, operandB. 
    switch(operator) {
        case "ADD":
            operandA = add(operandA, operandB);
            break;
        case "SUBTRACT":
            operandA = subtract(operandA, operandB);
            break;
        case "MULTIPLY":
            operandA = multiply(operandA, operandB);
            break;
        case "DIVIDE": 
            operandA = divide(operandA, operandB);
            break; 
        case "MODULUS":
            operandA = modulus(operandA, operandB);
        default:
            break;
    }
    // Store result in operandA and display. 
    displayOutput(operandA);
    // Set up data for further operations on result. Currently selected operator will carry over. 
    operandB = null;
}