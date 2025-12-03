/**
 * Modern Calculator - JavaScript Implementation
 * Features: Basic operations, chained calculations, history, keyboard support
 */

class Calculator {
    constructor() {
        this.currentValue = '0';
        this.storedValue = null;
        this.pendingOperator = null;
        this.resetOnNextInput = false;
        this.history = [];
        this.currentExpression = '';

        // Get DOM elements
        this.currentDisplay = document.getElementById('currentDisplay');
        this.historyDisplay = document.getElementById('historyDisplay');
        this.historyList = document.getElementById('historyList');

        // Initialize keyboard support
        this.initKeyboardSupport();
    }

    /**
     * Initialize keyboard event listeners
     */
    initKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            // Prevent default for calculator keys
            if (/^[0-9+\-*/.=]$/.test(e.key) || e.key === 'Enter' || e.key === 'Escape') {
                e.preventDefault();
            }

            // Number keys
            if (/^[0-9]$/.test(e.key)) {
                this.inputNumber(e.key);
            }
            // Operator keys
            else if (e.key === '+') {
                this.inputOperator('+');
            }
            else if (e.key === '-') {
                this.inputOperator('-');
            }
            else if (e.key === '*') {
                this.inputOperator('*');
            }
            else if (e.key === '/') {
                this.inputOperator('/');
            }
            // Decimal point
            else if (e.key === '.') {
                this.inputDecimal();
            }
            // Calculate
            else if (e.key === 'Enter' || e.key === '=') {
                this.calculate();
            }
            // Clear
            else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
                this.clear();
            }
            // Backspace
            else if (e.key === 'Backspace') {
                this.backspace();
            }
        });
    }

    /**
     * Input a number digit
     */
    inputNumber(num) {
        if (this.resetOnNextInput || this.currentValue === '0') {
            this.currentValue = num;
            this.resetOnNextInput = false;
        } else {
            this.currentValue += num;
        }
        this.updateDisplay();
    }

    /**
     * Input decimal point
     */
    inputDecimal() {
        if (this.resetOnNextInput) {
            this.currentValue = '0.';
            this.resetOnNextInput = false;
        } else if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
        }
        this.updateDisplay();
    }

    /**
     * Input an operator
     */
    inputOperator(operator) {
        const value = parseFloat(this.currentValue);

        if (this.storedValue === null) {
            this.storedValue = value;
        } else if (this.pendingOperator && !this.resetOnNextInput) {
            const result = this.performCalculation(
                this.storedValue,
                value,
                this.pendingOperator
            );
            this.storedValue = result;
            this.currentValue = this.formatNumber(result);
        }

        this.pendingOperator = operator;
        this.currentExpression = this.formatNumber(this.storedValue) + ' ' + this.getOperatorSymbol(operator);
        this.resetOnNextInput = true;
        this.updateDisplay();
    }

    /**
     * Perform the calculation
     */
    calculate() {
        if (this.pendingOperator === null) {
            return;
        }

        const value = parseFloat(this.currentValue);
        const expression = this.currentExpression + ' ' + this.formatNumber(value);

        try {
            const result = this.performCalculation(
                this.storedValue,
                value,
                this.pendingOperator
            );

            // Add to history
            this.addToHistory(expression, this.formatNumber(result));

            this.currentValue = this.formatNumber(result);
            this.storedValue = null;
            this.pendingOperator = null;
            this.currentExpression = '';
            this.resetOnNextInput = true;
            this.updateDisplay();
        } catch (error) {
            this.showError(error.message);
        }
    }

    /**
     * Perform arithmetic operation
     */
    performCalculation(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) {
                    throw new Error('Division by zero');
                }
                return a / b;
            default:
                throw new Error('Invalid operator');
        }
    }

    /**
     * Clear calculator
     */
    clear() {
        this.currentValue = '0';
        this.storedValue = null;
        this.pendingOperator = null;
        this.currentExpression = '';
        this.resetOnNextInput = false;
        this.updateDisplay();
    }

    /**
     * Backspace - remove last digit
     */
    backspace() {
        if (this.resetOnNextInput) {
            return;
        }

        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }

    /**
     * Format number for display (remove trailing zeros)
     */
    formatNumber(num) {
        if (typeof num === 'string') {
            num = parseFloat(num);
        }

        if (isNaN(num) || !isFinite(num)) {
            return 'Error';
        }

        // For very small or very large numbers, use exponential notation
        if (Math.abs(num) < 0.000001 && num !== 0) {
            return num.toExponential(4);
        }
        if (Math.abs(num) > 999999999) {
            return num.toExponential(4);
        }

        // Remove trailing zeros
        let str = num.toString();
        if (str.includes('.')) {
            str = str.replace(/\.?0+$/, '');
        }
        return str;
    }

    /**
     * Get operator symbol for display
     */
    getOperatorSymbol(operator) {
        switch (operator) {
            case '+': return '+';
            case '-': return '−';
            case '*': return '×';
            case '/': return '÷';
            case '(': return '(';
            case ')': return ')';
            default: return operator;
        }
    }

    /**
     * Update display
     */
    updateDisplay() {
        this.currentDisplay.textContent = this.currentValue;
        this.historyDisplay.textContent = this.currentExpression;

        // Remove error class if present
        this.currentDisplay.classList.remove('error');
    }

    /**
     * Show error message
     */
    showError(message) {
        this.currentValue = message;
        this.currentDisplay.textContent = message;
        this.currentDisplay.classList.add('error');
        this.storedValue = null;
        this.pendingOperator = null;
        this.currentExpression = '';
        this.resetOnNextInput = true;

        // Clear error after 2 seconds
        setTimeout(() => {
            if (this.currentValue === message) {
                this.clear();
            }
        }, 2000);
    }

    /**
     * Add calculation to history
     */
    addToHistory(expression, result) {
        const entry = {
            expression: expression,
            result: result,
            timestamp: new Date()
        };

        this.history.unshift(entry);

        // Keep only last 10 entries
        if (this.history.length > 10) {
            this.history.pop();
        }

        this.updateHistoryDisplay();
    }

    /**
     * Update history display
     */
    updateHistoryDisplay() {
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<div class="history-empty">No calculations yet</div>';
            return;
        }

        this.historyList.innerHTML = '';
        this.history.forEach(entry => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = `${entry.expression} = ${entry.result}`;

            // Click to reuse result
            historyItem.style.cursor = 'pointer';
            historyItem.addEventListener('click', () => {
                this.currentValue = entry.result;
                this.resetOnNextInput = true;
                this.updateDisplay();
            });

            this.historyList.appendChild(historyItem);
        });
    }

    /**
     * Clear history
     */
    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
    }
}

// Initialize calculator when page loads
const calculator = new Calculator();

// Add visual feedback to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });

    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

console.log('Calculator loaded successfully!');
console.log('Keyboard shortcuts:');
console.log('  - Numbers: 0-9');
console.log('  - Operators: +, -, *, /');
console.log('  - Calculate: Enter or =');
console.log('  - Clear: Escape or C');
console.log('  - Backspace: Backspace');
