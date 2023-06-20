const displayContent = document.querySelector("#displayContent");
const calculatorKeys = document.querySelector("#calculatorKeys");
const operatorKeys = document.querySelectorAll(".operatorKey");
const equalsKey = document.querySelector(".equalsKey");
const clearKey = document.querySelector(".clearKey");

let num1 = null;
let operand = null;
let num2 = null;

calculatorKeys.addEventListener("click", e => {
  if (e.target.classList.contains("numberKey")) {
    const number = e.target.textContent;
    if (operand) {
      if (num2 === null) {
        num2 = parseFloat(number);
      } else {
        num2 = parseFloat(num2.toString() + number);
      }
      displayContent.textContent = num2;
    } else {
      if (num1 === null) {
        num1 = parseFloat(number);
      } else {
        num1 = parseFloat(num1.toString() + number);
      }
      displayContent.textContent = num1;
    }
  } else if (e.target.classList.contains("operatorKey")) {
    if (num1 !== null && num2 !== null) {
      calculate();
    }
    operand = e.target.textContent;
  } else if (e.target === equalsKey) {
    if (num1 !== null && operand && num2 !== null) {
      calculate();
      operand = null;
    }
  }
});

clearKey.addEventListener("click", () => {
  num1 = null;
  operand = null;
  num2 = null;
  displayContent.textContent = "0";
});

function calculate() {
  let result;
  switch (operand) {
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
      result = num1 / num2;
      break;
    default:
      return;
  }
  displayContent.textContent = result;
  num1 = result;
  num2 = null;
}
