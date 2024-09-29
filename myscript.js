const expressionDisplay = document.querySelector('.expression');
const resultDisplay = document.querySelector('.result');
const buttons = document.querySelectorAll('button');

let firstValue = ''; 
let secondValue = ''; 
let operator = ''; 
let result = ''; 
let awaitingSecondValue = false; 

function updateExpressionDisplay(value) {
    expressionDisplay.textContent = value;
}

function calculate(first, operator, second) {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);
    
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num2 !== 0 ? num1 / num2 : 'OOPS, div by 0';
      default:
        return second;
    }
}

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Handle number input
        if (!isNaN(value) || value === '.') {
            if (awaitingSecondValue) {
                secondValue += value;
                updateExpressionDisplay(`${firstValue} ${operator} ${secondValue}`);
                if (secondValue) {
                    result = calculate(firstValue, operator, secondValue);
                    resultDisplay.textContent = result;
                }
            } else {
                firstValue += value;
                updateExpressionDisplay(firstValue);
            }
        }

        // Handle operator input
        if (['+', '-', '*', '/'].includes(value)) {
            if (firstValue && !secondValue) {
                operator = value;
                awaitingSecondValue = true; // Now waiting for the second value
                updateExpressionDisplay(`${firstValue} ${operator}`);
            } else if (firstValue && secondValue) {
                // If second number is entered, evaluate first before setting new operator
                result = calculate(firstValue, operator, secondValue);
                resultDisplay.textContent = result;
                firstValue = result.toString(); // Store the result as the new firstValue
                secondValue = '';
                operator = value;
                updateExpressionDisplay(`${firstValue} ${operator}`);
            }
        }

        // Handle Clear button
        if (value === 'Clear') {
            firstValue = '';
            secondValue = '';
            operator = '';
            result = '';
            awaitingSecondValue = false;
            updateExpressionDisplay('0');
            resultDisplay.textContent = '0';
        }

        // Handle Delete button (delete last digit or operator)
        if (value === 'Delete') {
            if (awaitingSecondValue && secondValue) {
                secondValue = secondValue.slice(0, -1);
                updateExpressionDisplay(`${firstValue} ${operator} ${secondValue || ''}`);
            } else if (operator) {
                operator = '';
                awaitingSecondValue = false;
                updateExpressionDisplay(firstValue);
            } else {
                firstValue = firstValue.slice(0, -1);
                updateExpressionDisplay(firstValue || '0');
            }
        }
    });
});


// Step 8: Handle Edge Cases
// Deal with Special Cases:
// Ensure that the calculator handles edge cases like dividing by zero.
// Cut off the no. of zeroes
// Handle multiple operations in a row by resetting values correctly after a calculation.