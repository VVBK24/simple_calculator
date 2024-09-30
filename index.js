document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.button');
    const display = document.querySelector('.display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            switch (value) {
                case 'AC':
                    clearAll();
                    break;
                case 'DE':
                    deleteLast();
                    break;
                case '=':
                    calculateResult();
                    break;
                case '+':
                case '-':
                case 'x':
                case '/':
                    setOperator(value);
                    break;
                case '%':
                    calculatePercentage();
                    break;
                default:
                    appendNumber(value);
                    break;
            }
        });
    });

    function clearAll() {
        currentInput = '';
        operator = '';
        previousInput = '';
        display.textContent = '0';
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || '0';
    }

    function calculateResult() {
        if (currentInput && previousInput && operator) {
            currentInput = eval(`${previousInput} ${operator} ${currentInput}`).toString();
            display.textContent = currentInput;
            operator = '';
            previousInput = '';
        }
    }

    function setOperator(op) {
        if (currentInput) {
            if (operator) {
                calculateResult();
            }
            operator = op === 'x' ? '*' : op;
            previousInput = currentInput;
            currentInput = '';
        }
    }

    function calculatePercentage() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toString(); // Convert current input to percentage
            display.textContent = currentInput;
        }
    }

    function appendNumber(num) {
        currentInput += num;
        display.textContent = currentInput;
    }
});
