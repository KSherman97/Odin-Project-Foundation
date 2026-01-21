// objects related to output
const screen = document.querySelector(".screen");
const history = document.querySelector(".history")

// function buttons
const buttonClear = document.querySelector("#button-cls");
const buttonDec = document.querySelector("#button-dec");
const buttonCalc = document.querySelector("#button-calc");
const buttonBack = document.querySelector("#button-bs");

// operand buttons
const buttonAdd = document.querySelector("#button-add");
const buttonSub = document.querySelector("#button-sub");
const buttonMul = document.querySelector("#button-mul");
const buttonDiv = document.querySelector("#button-div");

// number buttons
const button0 = document.querySelector("#button-0");
const button1 = document.querySelector("#button-1");
const button2 = document.querySelector("#button-2");
const button3 = document.querySelector("#button-3");
const button4 = document.querySelector("#button-4");
const button5 = document.querySelector("#button-5");
const button6 = document.querySelector("#button-6");
const button7 = document.querySelector("#button-7");
const button8 = document.querySelector("#button-8");
const button9 = document.querySelector("#button-9");

let freshScreenState = true;
let lastActionWasEquals = false;

let pendingCalculationArray = [];
let rollingCalculation = 0.0;

function roundToThree(number) {
    return parseFloat(number.toFixed(3));
}

function createOpperand(operand) {

    if(operand === "=") {
        if(pendingCalculationArray.length < 2) {
            return;
        }

        pendingCalculationArray.push(Number(screen.textContent))
        updateHistory(` ${screen.textContent} = `, true);
        
        solve();
        return;
    }
    
    if(["+", "-", "*", "/"].includes(operand)) {
        const currentNumber = Number(screen.textContent);
        
        if(lastActionWasEquals) {
            pendingCalculationArray.splice(0, pendingCalculationArray.length); // clear old expression
            pendingCalculationArray.push(currentNumber);
            updateHistory(`${currentNumber} ${operand} `, true);
        } else {
            pendingCalculationArray.push(currentNumber);
            updateHistory(`${currentNumber} ${operand} `, true);
        }

        pendingCalculationArray.push(operand);
        lastActionWasEquals = false;
        freshScreenState = true;
        updateScreen("", true);
    }
}

function updateHistory(valueString, append = true) {
    if(append) {
        history.textContent += valueString;
    } else {
        history.textContent = valueString;
    }
}

function solve() {
    rollingCalculation = Number(pendingCalculationArray[0]);

    for(let i = 1; i < pendingCalculationArray.length; i+= 2) {
        const operator = pendingCalculationArray[i];
        const value = Number(pendingCalculationArray[i + 1]);

        if(operator === "+") {
            rollingCalculation += value;
        } else if(operator === "-") {
            rollingCalculation -= value;
        } else if(operator === "*") {
            rollingCalculation *= value;
        } else if(operator === "/") {
            rollingCalculation /= value;
        }
    }

    rollingCalculation = roundToThree(rollingCalculation);
    pendingCalculationArray.splice(0, pendingCalculationArray.length);
    pendingCalculationArray.push(rollingCalculation);
    lastActionWasEquals = true;

    updateScreen(rollingCalculation, true);
}

function updateScreen(valueString, clearScreenBool) {
    let updateValue = valueString;
    let clearScreen = clearScreenBool;

    if(clearScreen === true) {
        screen.textContent = updateValue;
    } else {
        screen.textContent = screen.textContent.concat(updateValue);
    }
}

/**
 * Handlers for the event listeners
 * This is necessary for a separation of concerns
 */

function handleDecimal() {
    if(screen.textContent.includes(".")) {
        return;
    }

   if(freshScreenState === true) {
        freshScreenState = false;
        updateScreen(".", true);
    } else {
        updateScreen(".", false);
    }
}

function handleBackspace() {
    if(lastActionWasEquals) {
        return;
    }

    if(freshScreenState) {
        updateScreen("0", true);
    } else {
        let current = screen.textContent;
        if(current.length <= 1) {
            // if there is one char left, then reset screen to zero
            updateScreen("0", true);
            freshScreenState = true;
        } else {
            screen.textContent = current.slice(0, -1);
        }
    }
}

function handleOperands(operand) {
    if(["+", "-", "*", "/", "="].includes(operand)) {
        if(operand === "-" && freshScreenState && !lastActionWasEquals) {
            if(!screen.textContent.startsWith("-")) {
                updateScreen("-", true);
                freshScreenState = false;
            }
            return;
        }

        if(freshScreenState && !lastActionWasEquals) {
            return;
        }

        createOpperand(operand);
        freshScreenState = true;
    }
}

function handleNumbers(number) {
    if(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(number)){
        if(freshScreenState || lastActionWasEquals) {
            // start fresh if screen is fresh or last action was =
            if(lastActionWasEquals) {
                pendingCalculationArray.splice(0, pendingCalculationArray.length);
                updateHistory("", false);
            }

            freshScreenState = false;
            lastActionWasEquals = false;
            updateScreen(number, true);
        } else {
            updateScreen(number, false);
        }
    }
}

function createEventListeners() {
    /**
     * Button Click Event Listeners
     */
    
    // clear button
    buttonClear.addEventListener('click', () => {
        freshScreenState = true;
        rollingCalculation = 0.0;
        pendingCalculationArray.splice(0, pendingCalculationArray.length);
        updateScreen("0", true);
        updateHistory("", false);
    });

    buttonBack.addEventListener('click', () => handleBackspace());

    // operands
    buttonDec.addEventListener('click', () => handleDecimal());
    buttonCalc.addEventListener('click', () => handleOperands("="));
    buttonAdd.addEventListener('click', () => handleOperands("+"));
    buttonSub.addEventListener('click', () => handleOperands("-"));
    buttonMul.addEventListener('click', () => handleOperands("*"));
    buttonDiv.addEventListener('click', () => handleOperands("/"));

    // values
    button0.addEventListener('click', () => handleNumbers("0"));
    button1.addEventListener('click', () => handleNumbers("1"));
    button2.addEventListener('click', () => handleNumbers("2"));
    button3.addEventListener('click', () => handleNumbers("3"));
    button4.addEventListener('click', () => handleNumbers("4"));
    button5.addEventListener('click', () => handleNumbers("5"));
    button6.addEventListener('click', () => handleNumbers("6"));
    button7.addEventListener('click', () => handleNumbers("7"));
    button8.addEventListener('click', () => handleNumbers("8"));
    button9.addEventListener('click', () => handleNumbers("9"));

    /**
     * Keyboard Press Event Listeners
     */
    document.addEventListener('keydown', (event) => {
        if (["+", "-", "*", "/", ".", "Enter"].includes(event.key)) {
            event.preventDefault();
        }

        if(event.key === '.') {
            handleDecimal();
        } else if(event.key === '+') {
            handleOperands("+");
        } else if(event.key === "-") {
            handleOperands("-");
        } else if(event.key === "*") {
            handleOperands("*");
        } else if(event.key === "/") {
            handleOperands("/");
        } else if(event.key === "0") {
            handleNumbers("0");
        } else if(event.key === "1") {
            handleNumbers("1");
        } else if(event.key === "2") {
            handleNumbers("2");
        } else if(event.key === "3") {
            handleNumbers("3");
        } else if(event.key === "4") {
            handleNumbers("4");
        } else if(event.key === "5") {
            handleNumbers("5");
        } else if(event.key === "6") {
            handleNumbers("6");
        } else if(event.key === "7") {
            handleNumbers("7");
        } else if(event.key === "8") {
            handleNumbers("8");
        } else if(event.key === "9") {
            handleNumbers("9");
        } else if(event.key === "Enter") {
            handleOperands("=");
        } else if(event.key === "Backspace") {
            event.preventDefault();
            handleBackspace();
        }
    });
}

createEventListeners();