let firstNumber = '';
let operator = '';
let secondNumber = '';
let isSecondNumber = false;

const displayElement = document.querySelector("#display");
const decimalButton = document.querySelector("#decimal");

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
const roundResult = function(result, decimalPlaces = 5) {
    return parseFloat(result.toFixed(decimalPlaces));
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
    decimalButton.disabled = false;
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
    if (!firstNumber.includes(".") && !secondNumber.includes(".")) {
        decimalButton.disabled = false;
    }
}

function appendNumber(number) {
    if (!isSecondNumber) {
        firstNumber += number;
        updateDisplay(firstNumber);
    } else {
        secondNumber += number;
        updateDisplay(firstNumber + operator + secondNumber);
    }
}

function appendOperator(op) {
    if (firstNumber === "") return;
    if (!isSecondNumber) {
        operator = op;
        isSecondNumber = true;
        decimalButton.disabled = false;
        updateDisplay(firstNumber + operator);
    } else if (secondNumber !== "") {
        calculate();
        operator = op;
        isSecondNumber = true,
        decimalButton.disabled = false;
        updateDisplay(firstNumber + operator);
    }
}

function appendDecimal() {
    if (!isSecondNumber) {
        if (!firstNumber.includes(".")) {
            firstNumber += ".";
            updateDisplay(firstNumber);
            decimalButton.disabled = true;
        }
    } else {
        if (!secondNumber.includes(".")) {
            secondNumber += ".";
            updateDisplay(firstNumber + operator + secondNumber);
            decimalButton.disabled = true;
        }
    }
}

function calculate() {
    if (firstNumber === "" || operator === "" || secondNumber === "") return;
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let result = operate(operator, num1, num2);
    if (result === "Error: Division by zero") {
        updateDisplay(result);
        setTimeout(clearDisplay, 2000);
    } else {
    result = roundResult(result);
    firstNumber = result.toString();
    operator = "";
    secondNumber = "";
    isSecondNumber = false;
    decimalButton.disabled = firstNumber.includes(".");
    updateDisplay(firstNumber);
 }
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    console.log("Key pressed", key);
    if (/^[0-9]$/.test(key)) {
        appendNumber(parseInt(key));
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        appendOperator(key);
    } else if (key === "." || key === ",") {
        appendDecimal();
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Backspace" || key === "Delete") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});