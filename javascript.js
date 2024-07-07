let firstNumber = '';
let operator = '';
let secondNumber = '';
let isSecondNumber = false;

const displayElement = document.querySelector("#display");

const add = function(a, b) {
    return a + b;
};

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    if (b === 0) {
        return "Error: Division by zero";
    }
    return a / b;
}

const operate = function(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return null;
    }
}
function updateDisplay(value) {
    displayElement.value = value;
}

function clearDisplay() {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    isSecondNumber = false;
    updateDisplay("");
}

function deleteLast() {
    if (isSecondNumber && secondNumber !== "") {
        secondNumber = secondNumber.slice(0, -1);
        updateDisplay(firstNumber + operator + secondNumber);
    } else if (operator !== "") {
        operator = "";
        isSecondNumber = false;
        updateDisplay(firstNumber);
    } else if (firstNumber !== "") {
        firstNumber = firstNumber.slice(0, -1);
        updateDisplay(firstNumber);
    }
}