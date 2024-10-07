const expressionDisplay = document.querySelector(".expression");
const resultDisplay = document.querySelector(".result");
const buttons = document.querySelectorAll("button");

let firstValue = "";
let secondValue = "";
let operator = "";
let result = "";
let awaitingSecondValue = false;
let lastTouchTime = 0;

function updateExpressionDisplay(value) {
  expressionDisplay.textContent = value;
}

function updateResultDisplay(value) {
  resultDisplay.textContent = value || "0";
}

function calculate(first, operator, second) {
  const num1 = parseFloat(first);
  const num2 = parseFloat(second);

  switch (operator) {
    case "+":
      return Math.round((num1 + num2) * 1000) / 1000;
    case "-":
      return Math.round((num1 - num2) * 1000) / 1000;
    case "*":
      return Math.round(num1 * num2 * 1000) / 1000;
    case "/":
      return Math.round((num1 / num2) * 1000) / 1000;

    default:
      return second;
  }
}

function appendValue(currentValue, inputValue) {
  if (currentValue === "0" && inputValue !== ".") {
    return inputValue;
  }

  if (inputValue === ".") {
    if (currentValue.includes(".")) {
      // Ignore the input if decimal point already exists
      return currentValue;
    } else if (currentValue === "") {
      return "0.";
    }
  }
  return currentValue + inputValue;
}

// Add event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener(
    "touchstart",
    function (event) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - lastTouchTime;

      if (timeDifference < 300) {
        event.preventDefault(); //Prevent zoom on double-tap
      }

      lastTouchTime = currentTime;
    },
    { passive: false }
  );

  button.addEventListener("click", () => {
    const value = button.textContent;

    // Handle number and decimal input
    if (!isNaN(value) || value === ".") {
      if (awaitingSecondValue) {
        if (operator === "/" && value === "0") {
          alert("OOPS, division by zero is not allowed!");
          secondValue = "";
          return;
        }
        secondValue = appendValue(secondValue, value);
        updateResultDisplay(secondValue);
      } else {
        // Update firstValue
        firstValue = appendValue(firstValue, value);
        updateResultDisplay(firstValue);
        updateExpressionDisplay(`${firstValue}`);
      }
    }

    // Handle operator input
    else if (["+", "-", "*", "/"].includes(value)) {
      if (firstValue && !secondValue) {
        operator = value;
        awaitingSecondValue = true; // Now waiting for the second value
        updateExpressionDisplay(`${firstValue} ${operator}`);
      }
    }

    // Handle Equals button
    else if (value === "=") {
      if (firstValue && operator && secondValue) {
        result = calculate(firstValue, operator, secondValue);
        updateExpressionDisplay(`${firstValue} ${operator} ${secondValue} =`);
        updateResultDisplay(result);
        firstValue = result.toString();
        secondValue = "";
        operator = "";
        awaitingSecondValue = false;
      }
    }

    // Handle Clear button
    else if (value === "Clear") {
      firstValue = "";
      secondValue = "";
      operator = "";
      result = "";
      awaitingSecondValue = false;
      updateExpressionDisplay("");
      updateResultDisplay("0");
    }

    // Handle Delete button (delete last digit or operator)
    else if (value === "Delete") {
      if (resultDisplay.textContent !== "0") {
        resultDisplay.textContent =
          resultDisplay.textContent.slice(0, -1) || "0";
        firstValue = resultDisplay.textContent;

        if (firstValue === "") {
          resultDisplay.textContent = "0";
          firstValue = "0";
        }
      }
    }
  });
});

// Add event listener to key presses
document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Handle number and decimal input
  if (!isNaN(key) || key === ".") {
    if (awaitingSecondValue) {
      if (operator === "/" && key === "0") {
        alert("OOPS, division by zero is not allowed!");
        secondValue = "";
        return;
      }
      secondValue = appendValue(secondValue, key);
      updateResultDisplay(secondValue);
    } else {
      firstValue = appendValue(firstValue, key);
      updateResultDisplay(firstValue);
      updateExpressionDisplay(`${firstValue}`);
    }
  }

  // Handle operator input
  else if (["+", "-", "*", "/"].includes(key)) {
    if (firstValue && !secondValue) {
      operator = key;
      awaitingSecondValue = true;
      updateExpressionDisplay(`${firstValue} ${operator}`);
    }
  }

  // Handle Equals 
  else if (key === "Enter" || key === "=") {
    if (firstValue && operator && secondValue) {
      result = calculate(firstValue, operator, secondValue);
      updateExpressionDisplay(`${firstValue} ${operator} ${secondValue} =`);
      updateResultDisplay(result);
      firstValue = result.toString();
      secondValue = "";
      operator = "";
      awaitingSecondValue = false;
    }
  }

  // Handle Clear (Escape)
  else if (key === "Escape") {
    firstValue = "";
    secondValue = "";
    operator = "";
    result = "";
    awaitingSecondValue = false;
    updateExpressionDisplay("");
    updateResultDisplay("0");
  }

  // Handle Delete button (delete last digit or operator)
  else if (key === "Delete" || key === "Backspace") {
    if (resultDisplay.textContent !== "0") {
      resultDisplay.textContent = resultDisplay.textContent.slice(0, -1) || "0";
      firstValue = resultDisplay.textContent;

      if (firstValue === "") {
        resultDisplay.textContent = "0";
        firstValue = "0";
      }
    }
  }
});
