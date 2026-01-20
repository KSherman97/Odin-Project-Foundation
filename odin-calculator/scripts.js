// objects related to output
const screen = document.querySelector(".screen");

// function buttons
const buttonClear = document.querySelector("#button-cls");
const buttonDec = document.querySelector("#button-dec");
const buttonCalc = document.querySelector("#button-calc");

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
        solve();
        return;
    }
    
    if(["+", "-", "*", "/"].includes(operand)) {
        if(!lastActionWasEquals) {
            pendingCalculationArray.push(Number(screen.textContent));
        }

        pendingCalculationArray.push(operand);
        lastActionWasEquals = false;

        updateScreen("", true);
    }
}

function solve() {
    let rollingCalculation = Number(pendingCalculationArray[0]);

    for(let i = 0; i < pendingCalculationArray.length; i++) {
        console.log(pendingCalculationArray[i]);
    }

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
    pendingCalculationArray.splice(0, pendingCalculationArray.length);
    pendingCalculationArray.push(Number(rollingCalculation));
    lastActionWasEquals = true;

    rollingCalculation = roundToThree(rollingCalculation);

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

function createEventListeners() {
    // clear button
    buttonClear.addEventListener('click', () => {
        freshScreenState = true;
        rollingCalculation = 0.0;
        pendingCalculationArray.splice(0, pendingCalculationArray.length);
        updateScreen("0.00", true);
    });

    // calculate button
    buttonCalc.addEventListener('click', () => {
        createOpperand("=");
    });
    
    // decimal button
    buttonDec.addEventListener('click', () => {
        if(freshScreenState === true) {
            freshScreenState = false;
            updateScreen(".", true);
        } else {
            updateScreen(".", false);
        }
    });

    // 0 button
    button0.addEventListener('click', () => {
        if(freshScreenState === true) {
            freshScreenState = false;
            updateScreen("0", true);
        } else {
            updateScreen("0", false);
        }
    });

    // 1 button
    button1.addEventListener('click', () => {
        if(freshScreenState === true) {
            freshScreenState = false;
            updateScreen("1", true);
        } else {
            updateScreen("1", false);
        }
    });

    // 2 button
    button2.addEventListener('click', () => {
        if(freshScreenState === true) {
            freshScreenState = false;
            updateScreen("2", true);
        } else {
            updateScreen("2", false);
        }
    });

    // 3 button
    button3.addEventListener('click', () => {
        if(freshScreenState === true) {
            freshScreenState = false;
            updateScreen("3", true);
        } else {
            updateScreen("3", false);
        }
    });

    // 4 button
    button4.addEventListener('click', () => {
        if(freshScreenState === true) {
            freshScreenState = false;
            updateScreen("4", true);
        } else {
            updateScreen("4", false);
        }
    });
    
    // 5 button
    button5.addEventListener('click', () => {
        if(freshScreenState === true) {
            freshScreenState = false;
            updateScreen("5", true);
        } else {
            updateScreen("5", false);
        }
    });

    // 6 button
    button6.addEventListener('click', () => {
        if(freshScreenState === true) {
            freshScreenState = false;
            updateScreen("6", true);
        } else {
            updateScreen("6", false);
        }
    });

    // 7 button
    button7.addEventListener('click', () => {
        if(freshScreenState === true) {
            freshScreenState = false;
            updateScreen("7", true);
        } else {
            updateScreen("7", false);
        }
    });

    // 8 button
    button8.addEventListener('click', () => {
        if(freshScreenState === true) {
            freshScreenState = false;
            updateScreen("8", true);
        } else {
            updateScreen("8", false);
        }
    });

    // 9 button
    button9.addEventListener('click', () => {
        if(freshScreenState === true) {
            freshScreenState = false;
            updateScreen("9", true);
        } else {
            updateScreen("9", false);
        }
    });

    // math buttons
    // + button
    buttonAdd.addEventListener('click', () => {
        createOpperand("+");
    });

    // - button
    buttonSub.addEventListener('click', () => {
        createOpperand("-");
    });

    // * button
    buttonMul.addEventListener('click', () => {
        createOpperand("*");
    });

    // / button
    buttonDiv.addEventListener('click', () => {
        createOpperand("/");
    });
}

createEventListeners();