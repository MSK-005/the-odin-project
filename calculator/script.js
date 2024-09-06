const SUPPORTED_DIGITS = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const SUPPORTED_MATHEMATICAL_OPERATIONS = ["+", "-", "*", "/"];
const SUPPORTED_CALCULATOR_OPERATIONS = ["all-clear", "backspace", "equal"];
const MAX_NUMBER_LENGTH = 15;

function addSupportedValueToArray(value, arr) {

    if (SUPPORTED_DIGITS.includes(value)) {
        if (arr.length === 0 || arr.length === 2) {
            arr.push(value);
        } else if (arr.length === 1 || arr.length === 3) {
            if ((arr[arr.length - 1].length < (MAX_NUMBER_LENGTH - 1) && ((value === "." && !arr[arr.length - 1].includes(".")) || (value !== ".")))
                ||
                (arr[arr.length - 1].length === (MAX_NUMBER_LENGTH - 1) && value !== ".")
            ) {
                arr[arr.length - 1] += value;
            }
        }
    } else if (SUPPORTED_MATHEMATICAL_OPERATIONS.includes(value)) {
        if (arr.length === 1 || arr.length === 3) {
            arr.push(value);
        }
    } else if (SUPPORTED_CALCULATOR_OPERATIONS.includes(value)) {
        if (value === "all-clear") {
            arr.length = 0;
        } else if (value === "backspace") {
            if (arr.length > 0) {
                let focusedString = arr[arr.length - 1].slice(0, -1);
                focusedString.length > 0 ? arr[arr.length - 1] = focusedString : arr.pop();
            }
        } else if (value === "equal") {
            if (arr.length >= 3) {
                calculateValue(arr);
            }
        }
    }
    return arr;
}

function updateDisplay(arr) {
    function displayCharacters(arr, display) {
        display.textContent = "";
        arr.forEach((character) => {
            display.textContent += character;
        });
    }

    let display = document.querySelector(".display");
    let arrLength = arr.length;
    if (arrLength === 0) {
        display.textContent = "Calculator";
    } else if (arrLength >= 1 && arrLength <= 3) {
        displayCharacters(arr, display);
    } else if (arrLength === 4) {
        arr = calculateValue(arr);
        displayCharacters(arr, display);
    }
}

function calculateValue(arr) {
    let num1 = parseFloat(arr[0]);
    let num2 = parseFloat(arr[2]);
    let operator = arr[1];
    let result = null;
    
    switch(operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                alert("You cannot divide by 0!");
            } else {
                result = num1 / num2;
            }
            break;
        default: 
            alert("Error in evaluating expression.");
    }
    
    if (!Number.isInteger(result)) result = parseFloat(result.toFixed(MAX_NUMBER_LENGTH));

    result = result.toString();
    arr.splice(0, 3);
    arr.unshift(result);

    return arr;
}

function initializeCalculatorSetup() {
    function initMouseEventListener(e, buttonPressed, operationsArray) {
        buttonPressed = e.target.value
        operationsArray = addSupportedValueToArray(buttonPressed, operationsArray);
        updateDisplay(operationsArray);

        return operationsArray;
    }

    function initKeyboardEventListener(e, buttonPressed, operationsArray) {
        buttonPressed = e.key.toLowerCase();
        if (buttonPressed === "enter") buttonPressed = "equal";
        if (buttonPressed === "escape") buttonPressed = "all-clear";
        operationsArray = addSupportedValueToArray(buttonPressed, operationsArray);
        updateDisplay(operationsArray);

        return operationsArray;
    }

    const buttonsParentContainer = document.querySelector(".calculator-buttons-container");
    let operationsArray = [];
    let buttonPressed = null;
    buttonsParentContainer.addEventListener("click", function (e) {
        initMouseEventListener(e, buttonPressed, operationsArray);
    });

    document.addEventListener("keydown", function (e) {
        initKeyboardEventListener(e, buttonPressed, operationsArray);
    });
}

initializeCalculatorSetup();