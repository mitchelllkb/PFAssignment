document.addEventListener("DOMContentLoaded", () => {
  const varBtn = document.getElementById("showvar");
  const letBtn = document.getElementById("showlet");
  const constBtn = document.getElementById("showconst");
  const showOutput1 = document.getElementById("output1");
  const showOutput2 = document.getElementById("output2");
  const outputNote1 = document.getElementById("outputnote1");
  const outputNote2 = document.getElementById("outputnote2");
  const resetBtn = document.getElementById("resetbtn");

  const outputN1 = {
    varn1:`var is function-scoped and hoisted.`,
    letn1:`let is block-scoped and it will not react to  hoisting like var.`,
    constn1:`const is block-scoped and must be initialized.`
  }
  const outPut1 = {
  var: `var name = "Alice";
console.log(name); //Output shown in console as "Alice"`,
  let: `let age = 25;
console.log(age); //Output shown in console as 25`,
  const: `const PI = 3.14;
console.log(PI); //Output shown in console as 3.14`
  };
const outputN2 = {
    varn2:`
  Variables can also be declared as a boolean value.`,
    letn2:`
    Declaration to change value of age to 28 is valid.`,
    constn2:`
    Declaration to change value of PI to 3.142 will result an error.`
  }

const outPut2 = {
var: `var isThirty = true;
console.log(isThirty); //Output shown in console as true`,
    let: `age = 28;
console.log(age); //Output shown in console as 28`,
    const: `const PI = 3.142;
console.log(PI);//output: shownSyntaxError:Identifier 'PI' has already been declared`
};

varBtn.addEventListener("click", () => {
    outputNote1.textContent = outputN1.varn1;
    showOutput1.textContent = outPut1.var;
    outputNote2.textContent = outputN2.varn2;
    showOutput2.textContent = outPut2.var;    
  });

letBtn.addEventListener("click", () => {

    outputNote1.textContent = outputN1.letn1;
    showOutput1.textContent = outPut1.let;
    outputNote2.textContent = outputN2.letn2;
    showOutput2.textContent = outPut2.let;
  });

constBtn.addEventListener("click", () => {
    outputNote1.textContent = outputN1.constn1;
    showOutput1.textContent = outPut1.const;
    outputNote2.textContent = outputN2.constn2;
    showOutput2.textContent = outPut2.const;
  });

resetBtn.addEventListener("click", () => {
    showOutput1.textContent = "";
    showOutput2.textContent = "";
    outputNote1.textContent = "";
    outputNote2.textContent = "";
  });

  });

  document.addEventListener("DOMContentLoaded", () => {
  const showSample = document.getElementById("sampledata");
  const dataType = document.getElementById("datatype");
  const userInput = document.getElementById("userInput");

  //creating a sample data in an object as sampleData.
  const sampleData = {
    Number: "23",
    String: `"Hello"`,
    Boolean: "true",
    Undefined: "undefined",
    Null: "null",
    BigInt: "12345678901234567890n",
    Symbol: "Symbol('id')",
    Object: `{ name: "Alice" }`,
    Array: `[1, 2, 3]`,
    Function: `function greet() { return "Hi"; }`
  };

  const allBtns = document.querySelectorAll("button[data-type]");
  allBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      showSample.textContent = `let data = ${sampleData[type]};`;
    });
  });

  document.getElementById("checktype").addEventListener("click", () => {
    try {
      const value = eval(`(${userInput.value})`);// assign 'value' to be a variable while using eval() to capture the exact output value
      dataType.textContent = `typeof ${userInput.value} → ${typeof value}`;//output print
    } catch (err) {
      dataType.textContent = `Error: ${err.message}`;
    }
  });
});
