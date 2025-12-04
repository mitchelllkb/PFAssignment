document.querySelectorAll('.btnbasic').forEach(btn => {
  btn.addEventListener('click', () => {
    const explanations = {
      'Brackets': 'let total = (2 + 3) * 4; // The + operator within Brackets is of the highest priority.\nconsole.log(total); //it will return total 20.',
      'Multiplication': 'let total = 2 + 3 * 6; // * operator is prioritized ahead of +.\nconsole.log(total); //it return total as 20',
      'Division': 'let total = 19 - 12 / 4; // The / operator is prioritized ahead of -.\nconsole.log(total); // it will return total as 22',
      'Addition': 'let total = 5 + 3 - 2; // The + and - operators have the same priority.\nconsole.log(total); // It will return total as 6',
      'Subtraction': 'let total = 10 - 4 + 5; // The + and - operators have the same priority.\nconsole.log(total); // It will return total as 11'
    };
    document.getElementById('btnbasicoutput').textContent = explanations[btn.textContent];
  });
});

document.querySelectorAll('.btnlogic').forEach(btn => {
  btn.addEventListener('click', () => {
    const explanations = {
      '++': 'let x = 5;\nx++;\nconsole.log(x); // It will return x as 6',
      '--': 'let y = 3;\ny--;\nconsole.log(y); // It will return y as 2',
      '**': 'let z = 2**3;\nconsole.log(z); //It will return z as 8',
      '%': 'let remainder = 16 % 3;\nconsole.log(remainder); // It will return remainder as 1'
    };
    document.getElementById('btnlogicoutput').textContent = explanations[btn.textContent];
  });
});

document.querySelectorAll('.btnmethod').forEach(btn => {
  btn.addEventListener('click', () => {
    const explanations = {
      'Math.sqrt()': "let squareroot = Math.sqrt(9); // Declaring squareroot as the variable. To calculate the Square root of 9 which is the parameter.\nconsole.log(squareroot); //It will return squareroot as 3.",
      'Math.pow()': "let numpower = Math.pow(2, 3); // Declaring numpower as the variable. It's the same as 2**3 \nconsole.log(numpower); // Based on the arguments (2,3),it will return value as 8.",
      'Math.round()': "let num = Math.round(4.6); //Declaring num as a variable,rounding it to an integer.\nconsole.log(num); //It will return as 5. If it's .5 and above, it will round up as 5. If less than .5, it will round down as 4.",
      'Math.random()': "let randomnum =Math.random(); //This method will return a random float value between 0 and 1."
    };
    document.getElementById('btnmethodoutput').textContent = explanations[btn.textContent];
  });
});

const rButtons = document.querySelectorAll(".rowbtn");
const acButton = document.getElementById("acbtn");
const lblDisplay = document.getElementById("display");
const lblDisplayResult = document.getElementById("displayresult");
const backButton = document.getElementById("backbtn");
const eqButton = document.getElementById("eqbtn");

let lastResult = null;
let justEvaluated = false;

// Standard operators
const operators = ["+", "-", "*", "/", "%"];
// Special expressions (multi-character or function-like)
const specialOperators = ["**", "√"];

function clearAll() {
  lblDisplay.textContent = "";
  lblDisplayResult.textContent = "";
  lastResult = null;
  justEvaluated = false;
}
acButton.addEventListener("click", clearAll); //call to clear all screen when AC button clicked
backButton.addEventListener("click", revertLast); //call to backspace once when <- button clicked
eqButton.addEventListener("click",calcExpression); //call to run calcExpression() when clicked.

function revertLast()
{
  let exprShow = lblDisplay.textContent;
  lblDisplay.textContent = exprShow.slice(0, -1);
}

function appendExponent(base, exp) {
  const display = document.getElementById("display");

  // Clear if just evaluated
  if (justEvaluated) {
    display.textContent = "";
    justEvaluated = false;
  }

  // Create a span for the base
  const baseNode = document.createTextNode(base);

  // Create a <sup> element for the exponent
  const supNode = document.createElement("sup");
  supNode.textContent = exp;

  // Append both to the display
  display.appendChild(baseNode);
  display.appendChild(supNode);
}



function calcExpression() {
  let exprShow = lblDisplay.textContent.trim();

  // --- Handle square root cases ---
  // Case: number before √decimal → (number * Math.sqrt(decimal))
  exprShow = exprShow.replace(/(\d+(?:\.\d+)?)√(\d+(?:\.\d+)?)/g, "($1*Math.sqrt($2))");
  // Case: √decimal → Math.sqrt(decimal)
  exprShow = exprShow.replace(/√(\d+(?:\.\d+)?)/g, "Math.sqrt($1)");
  // Case: √(expression) → Math.sqrt(expression)
  exprShow = exprShow.replace(/√\(([^)]+)\)/g, "Math.sqrt($1)");

  // Percentage: number% → (number/100)
  // Only match when % is NOT followed by another digit
  exprShow = exprShow.replace(/(\d+(?:\.\d+)?)%(?!\d)/g, "($1/100)");

  // Guard: empty or ends with operator (AFTER replacements)
  if (!exprShow || /[+\-*/%]$/.test(exprShow)) {
    lblDisplayResult.textContent = "Error: incomplete expression";
    return;
  }

  try {
    const result = Function(`"use strict"; return (${exprShow})`)();

    // Store result for chaining
    lastResult = result;
    justEvaluated = true;

    // Show result in BOTH labels
    lblDisplay.textContent = String(result);
    lblDisplayResult.textContent = String(result);
  } catch (e) {
    lblDisplayResult.textContent = "Error: invalid expression";
  }
}

rButtons.forEach(item => {
  item.addEventListener("click", () => {
    const value = item.dataset.value; // grab the data-value
    handleInput(value);
  });

  // Optional: keyboard accessibility
  item.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      handleInput(item.dataset.value);
    }
  });
});

function handleInput(val) {
  const display = document.getElementById("display");
  const current = display.textContent;

  // If just evaluated, continue cleanly from the last result
  if (justEvaluated) {
    if (operators.includes(val) || specialOperators.includes(val)) {
      // Continue from last result
      display.textContent = current + val;
    } else {
      // If user starts with a digit, decide:
      // Option A: continue from result (append)
      display.textContent = current + val;
      // Option B: start fresh (replace) 
      // display.textContent = val;
    }
    justEvaluated = false;
    return;
  }

  // --- Leading zero guard ---
  const lastChar = current.slice(-1);
  const isDigit = /^[0-9]$/.test(val);

  // Case: starting fresh with "0"
  if (current === "0" && isDigit) {
    // Replace the 0 with the new digit
    display.textContent = val;
    return;
  }

  // Case: prevent multiple zeros like "00"
  if (lastChar === "0" && isDigit && /(^|[+\-*/%√])0$/.test(current)) {
    display.textContent = current.slice(0, -1) + val;
    return;
  }

  // Case: allow "0." for decimals
  if (lastChar === "0" && val === ".") {
    display.textContent = current + ".";
    return;
  }



  // Prevent consecutive operators unless it's a valid special case
  if (operators.includes(val) && operators.includes(current.slice(-1))) {
    document.getElementById("displayresult").textContent = "Error: consecutive operators";
    return;
  }

  // Handle special expressions
  if (val === "√") {
    display.textContent += "√";
    return;
  }

  if (val === "**") {
    if (operators.includes(current.slice(-1))) {
      document.getElementById("displayresult").textContent = "Error: invalid exponent placement";
      return;
    }
    display.textContent += "**";
    return;
  }

  // Default case
  display.textContent += val;
}