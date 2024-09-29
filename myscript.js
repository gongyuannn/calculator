// Step 3: Set Up Basic JavaScript
// Step 4: Display Clicked Numbers
// Step 5: Handle Operations (e.g., +, -, , /)
const expressionDisplay = document.querySelector('.expression');
const resultDisplay = document.querySelector('.result');
const buttons = document.querySelectorAll('button');

let expression = ''; 

function updateExpressionDisplay(value) {
    expressionDisplay.textContent = value;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
  
      // Handle number and operator input
         if (!isNaN(value) || ['+', '-', '*', '/', '.'].includes(value)) {
          expression += value; // Append the clicked button's value to the expression
          updateExpressionDisplay(expression); // Update the expression display
      }
  
      // Handle Clear button
        if (value === 'Clear') {
            expression = ''; // Clear the expression
            updateExpressionDisplay('0'); // Reset display to 0
            resultDisplay.textContent = '0'; // Reset result display to 0
      }
  
      // Handle Delete button (deletes the last character)
        if (value === 'Delete') {
            expression = expression.slice(0, -1); // Remove the last character
            updateExpressionDisplay(expression || '0'); // Update display, show 0 if empty
      }
  
      // Handle Equals button (logic for evaluation will go here)
         if (value === '=') {
            try {
            const result = eval(expression); // Evaluate the expression
             resultDisplay.textContent = result; // Display the result
            } catch (error) {
                resultDisplay.textContent = 'OOPS'; // Handle invalid expressions
            }
        }
        });
  });

// Step 8: Handle Edge Cases
// Deal with Special Cases:
// Ensure that the calculator handles edge cases like dividing by zero.
// Handle multiple operations in a row by resetting values correctly after a calculation.