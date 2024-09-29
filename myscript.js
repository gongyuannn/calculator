// Step 3: Set Up Basic JavaScript
// Step 4: Display Clicked Numbers
// Step 5: Handle Operations (e.g., +, -, , /)
const display = document.querySelector('.result');
const buttons = document.querySelectorAll('button');

let firstValue = '';
let secondValue = '';
let operator = '';
let result = '';

function updateDisplay(value) {
    display.textContent = value;
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.textContent;
  
      if (!isNaN(value)) {
        // Handle number input
        if (!operator) {
          firstValue += value;
          updateDisplay(firstValue);
        } else {
          secondValue += value;
          updateDisplay(secondValue);
        }
      }
  
      // Handle operator input
      if (['+', '-', '*', '/'].includes(value)) {
        operator = value;
      }
  
      // Handle equals input
      if (value === '=') {
        // Calculate the result
        console.log('Perform calculation...');
      }
  
      // Handle clear input
      if (value === 'C') {
        firstValue = '';
        secondValue = '';
        operator = '';
        result = '';
        updateDisplay('0');
      }
  
      // Handle delete input
      if (value === 'DEL') {
        // Implement delete logic
      }
    });
  });

// Step 8: Handle Edge Cases
// Deal with Special Cases:
// Ensure that the calculator handles edge cases like dividing by zero.
// Handle multiple operations in a row by resetting values correctly after a calculation.