const resultDisplay = document.getElementById("calc-result");
const regex = /^\d+(\d$|[.]?\d*$)/;

// Operator is a string that identifies what we'll do with the operands. 
let operator = null;
let operandA = 0;
let operandB = 0;

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

const clear = function() {

}

const toggleNegative = function() {

}

const modulus = function() {

}

const numericInput = function(s) {
    // Will input as a string so can check against regex, then will cast into number. 

    // If operator is null, we are entering operandA. 

    // If operator has been selected/pulled over from previous calculation, we are entering operandB. 
}

const setOperator = function(operationName) {
    // operandA has been set. 

    // An operator is selected.

    // Now user enters operandB. 
}

const calculate = function() {
    // Switch(operator) and calculate with operandA, operandB. 

    // Store result in operandA and display. 

    // Set up data for further operations on result. 
    // operator stays the same unless changed, so numericInput is taking operandB. 
    // operandA holds result. 
}