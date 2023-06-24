const displayContent = document.querySelector("#displayContent");
const calculatorKeys = document.querySelector("#calculatorKeys");
const operatorKey = document.querySelector(".operatorKey");
const decimalKey = document.querySelector(".decimalKey");
const clearKey = document.querySelector(".clearKey");
const equalsKey = document.querySelector(".equalsKey");
const backspaceKey = document.querySelector(".backspace");

const errorMessages = [
  "Oops! Divide by zero",
  "Error: Infinity",
  "To infinity and beyond!",
  "You're a zero, dummy!",
  "Naught's the word!"
];

let num1 = "";
let operand = "";
let num2 = "";
let result = "";

calculatorKeys.addEventListener('click', handleButtonClick);

document.addEventListener('keydown', handleKeyboardInput);

function handleButtonClick(e) {
  if (e.target.classList.contains('numberKey')) {
    const number = e.target.textContent;
    if (!operand) {
      num1 += number;
      displayContent.textContent = num1;
    } else {
      num2 += number;
      displayContent.textContent = num2;
    }
  } else if (e.target.classList.contains('operatorKey')) {
    if (num1 && num2) {
      operate();
    }
    operand = e.target.textContent;
  } else if (e.target === decimalKey) {
    handleDecimalInput();
  } else if (e.target === equalsKey) {
    operate();
  } else if (e.target === backspaceKey) {
    handleBackspace();
  }
}

function handleKeyboardInput(e) {
  const key = e.key;
  if (/[0-9]/.test(key)) {
    handleNumberInput(key);
  } else if (/[+\-*/]/.test(key)) {
    handleOperatorInput(key);
  } else if (key === '.') {
    handleDecimalInput();
  } else if (key === 'Enter') {
    operate();
  } else if (key === 'Backspace') {
    handleBackspace();
  }
}

function handleNumberInput(key) {
  if (!operand) {
    num1 += key;
    displayContent.textContent = num1;
  } else {
    num2 += key;
    displayContent.textContent = num2;
  }
}

function handleOperatorInput(key) {
  if (num1 && num2) {
    operate();
  }
  operand = key;
}

function handleDecimalInput() {
  if (!operand && !num1.includes('.')) {
    if (num1 === '') {
      num1 = '0';
    }
    num1 += '.';
    displayContent.textContent = num1;
  } else if (operand && !num2.includes('.')) {
    if (num2 === '') {
      num2 = '0';
    }
    num2 += '.';
    displayContent.textContent = num2;
  }
}

function handleBackspace() {
  if (!operand) {
    num1 = num1.slice(0, -1);
    displayContent.textContent = num1;
  } else {
    num2 = num2.slice(0, -1);
    displayContent.textContent = num2;
  }
}

clearKey.addEventListener('click', () => {
  clearCalculator();
});

function clearCalculator() {
  num1 = "";
  operand = "";
  num2 = "";
  result = "";
  displayContent.textContent = "0";
}

function operate() {
  const number1 = parseFloat(num1);
  const number2 = parseFloat(num2);
  
  if (operand === '/' && number2 === 0) {
    displayContent.textContent = getRandomErrorMessage();
    return;
  }
  
  let tempResult;
  switch (operand) {
    case '+':
      tempResult = number1 + number2;
      break;
    case '-':
      tempResult = number1 - number2;
      break;
    case '*':
      tempResult = number1 * number2;
      break;
    case '/':
      tempResult = number1 / number2;
      break;
    default:
      break;
  }
  
  result = formatResult(tempResult);
  num1 = result;
  operand = "";
  num2 = "";
  displayContent.textContent = result;
}

function formatResult(value) {
  const roundedValue = value.toFixed(3);
  const integerPart = parseInt(roundedValue);
  const decimalPart = parseFloat(roundedValue.slice(-3));
  if (decimalPart === 0) {
    return integerPart.toString();
  } else {
    return parseFloat(roundedValue).toString();
  }
}

function getRandomErrorMessage() {
  const randomIndex = Math.floor(Math.random() * errorMessages.length);
  return errorMessages[randomIndex];
}
