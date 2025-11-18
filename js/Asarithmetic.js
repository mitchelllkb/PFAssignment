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