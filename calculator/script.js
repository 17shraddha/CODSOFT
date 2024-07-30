document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let firstOperand = null;
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'C') {
                currentInput = '0';
                firstOperand = null;
                operator = null;
                updateDisplay();
                return;
            }

            if (value === '=') {
                if (operator && firstOperand !== null) {
                    currentInput = String(operate(firstOperand, parseFloat(currentInput), operator));
                    firstOperand = null;
                    operator = null;
                    updateDisplay();
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (operator && firstOperand !== null) {
                    firstOperand = operate(firstOperand, parseFloat(currentInput), operator);
                } else {
                    firstOperand = parseFloat(currentInput);
                }
                operator = value;
                currentInput = '0';
                updateDisplay();
                return;
            }

            if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            updateDisplay();
        });
    });

    function updateDisplay() {
        if (operator && firstOperand !== null) {
            display.textContent = `${firstOperand} ${operator} ${currentInput}`;
        } else {
            display.textContent = currentInput;
        }
    }

    function operate(a, b, operator) {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return b;
        }
    }
});

