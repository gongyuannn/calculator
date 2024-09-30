// Delete behaviour - debug so that it works properly. first value is based on the result field after deleting
// Modify it such that only one decimal point is allowed to be pressed each time
// Cuts the decimal points of the evaluated number so it fits into the display
// Font change to calculator font

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
        return num2 !== 0 ? num1 / num2 : "OOPS, div by 0";
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
            } else {
                firstValue += value;
                updateExpressionDisplay(firstValue);
            }
        }

        // Handle operator input
        else if (['+', '-', '*', '/'].includes(value)) {
            if (firstValue && !secondValue) {
                operator = value;
                awaitingSecondValue = true; // Now waiting for the second value
                updateExpressionDisplay(`${firstValue} ${operator}`);
            } 
        }

        // Handle Equals button 
        else if (value === '=') {
            if (firstValue && operator && secondValue) {
                result = calculate(firstValue, operator, secondValue);
                updateExpressionDisplay(`${firstValue} ${operator} ${secondValue} =`);
                resultDisplay.textContent = result;
                firstValue = result.toString();
                secondValue = '';
                operator = '';
                awaitingSecondValue = false; 
            }
        }

        // Handle Clear button
        else if (value === 'Clear') {
            firstValue = '';
            secondValue = '';
            operator = '';
            result = '';
            awaitingSecondValue = false;
            updateExpressionDisplay('0');
            resultDisplay.textContent = '0';
        }

        // Handle Delete button (delete last digit or operator)
        else if (value === 'Delete') {
            if (resultDisplay.textContent !== '0') {
                resultDisplay.textContent = resultDisplay.textContent.slice(0, -1) || '0';
                firstValue = resultDisplay.textContent;

                if (firstValue === '') {
                    resultDisplay.textContent = '0';
                    firstValue = '0';
                }
        }
    }
});
});


// Step 8: Handle Edge Cases
// Deal with Special Cases:
// Ensure that the calculator handles edge cases like dividing by zero.
// Cut off the no. of zeroes
// Handle multiple operations in a row by resetting values correctly after a calculation.