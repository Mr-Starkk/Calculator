const buttons = document.getElementById('buttons');
const screen = document.getElementById('display');
const equal = document.getElementById('equal');
const clearButton = document.querySelector('.clear');
const backButton = document.querySelector('.backspace');
const dotButton = document.querySelector('.dot');
const percentButton = document.querySelector('.percentage');

let digit = null;
let digit2 = null;
let operator = null;
let answer = null;
let displaySwitch = false; // helps to clear screen after an operator has been clicked.


const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => (Math.round((a * b) * 1000000)) / 1000000;
const divide = (a, b) => (Math.round((a / b) * 1000000)) / 1000000;


function operate(operator, num1, num2) {
    if (operator == '+') return add(num1, num2);
    else if (operator == '-') return substract(num1, num2);
    else if (operator == '*') return multiply(num1, num2);
    else if (operator == '/') return divide(num1, num2);
}

buttons.querySelectorAll('.digit').forEach((button) => {
    button.addEventListener('click', () => {
        if (displaySwitch == true) {
            if (digit == undefined) {
                //digit turns undefined at equal.addEventListener()
                //this clears the screen if a digit is pressed after that.
                screen.textContent = '';
                digit = null;
                digit2 = null;
                operator = null;
                answer = null;
            }
            screen.textContent = '';
            displaySwitch = false;
        }
        screen.textContent += `${button.value}`;
    })
})

buttons.querySelectorAll('.operator').forEach((button) => {
    button.addEventListener('click', () => {


        if (digit !== null) {
            if (digit == undefined) {
                operator = `${button.value}`;
                digit = answer;
                return;
            }

            digit2 = parseFloat(screen.textContent);
            answer = operate(operator, digit, digit2);
            screen.textContent = answer;
            digit = answer;
            digit2 = null;
            operator = `${button.value}`;
            displaySwitch = true;
            return;
        }
        digit = parseFloat(screen.textContent);
        operator = `${button.value}`;
        displaySwitch = true;
    })
})

equal.addEventListener('click', () => {
    if (operator == null) return;
    digit2 = parseFloat(screen.textContent);
    answer = operate(operator, digit, digit2);
    screen.textContent = answer;
    digit = undefined;
    digit2 = null;
    operator = null;
    displaySwitch = true;
})

clearButton.addEventListener('click', () => {
    screen.textContent = '';
    digit = null;
    digit2 = null;
    operator = null;
    answer = null;
})

backButton.addEventListener('click', () => {
    screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1);
})

dotButton.addEventListener('click', () => {
    if (screen.textContent.indexOf('.') !== -1) return;
    screen.textContent += `${dotButton.value}`;
})
percentButton.addEventListener('click', () => {
    screen.textContent = parseInt(screen.textContent) / 100;
})