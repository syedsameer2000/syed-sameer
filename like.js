const keys = document.querySelectorAll('.key')
const preOperationEl = document.querySelector('.previous-operation');
const currentOperationEl = document.querySelector('.current-operation');
let operation;
let preOperation ;
let currentOperation;
let lastKeyIndex;
let lastKey;
let operationResult;
let clickedKeyName;
keys.forEach(key => {
  key.addEventListener('click', () => {
    clickedKeyName = key.dataset.keyname;
    lastKeyIndex = currentOperationEl.textContent.length - 1;
    lastKey = currentOperationEl.textContent[lastKeyIndex];
    populateScreen(clickedKeyName);
  })
})
function populateScreen(clickedKey) {
  if (currentOperationEl.textContent.length > 9) {
    currentOperationEl.style.fontSize = "2rem";
  }

  if (clickedKey === '*' || clickedKey === '+' || clickedKey === '-' || clickedKey === '/' || clickedKey === '=') {

    if (lastKey !== ' ') {
      preOperationEl.textContent += `${currentOperationEl.textContent} ${clickedKey}`;
      currentOperationEl.textContent = " ";
    }
    if (clickedKey === '=') {
      operation = preOperationEl.textContent
      console.log(operation);
      operationResult = operate(operation)
      if (operationResult === Infinity) {
        operationResult ='WTF !^&*(*&^%%';
      }
      preOperationEl.textContent = ""
      currentOperationEl.textContent=operationResult;
    }
  }
  else if (clickedKey === 'del') {
    currentOperationEl.textContent = currentOperationEl.textContent.slice(0,-1);
  } else if (clickedKey === 'reset') {
    reset();
  }
  else {
    currentOperationEl.textContent += clickedKey;
  }
}


function operate(operation) {
  operation = operation.split(' ')

  let operationResult;
  while (operation.includes('/') || operation.includes('*')) {
    for (let i = 0; i < operation.length; i++) {
      if (operation[i] === '*') {
        operation[i] = operation[i + 1];
        operation[i] *= operation[i - 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
      if (operation[i] === '/') {
        operation[i] = operation[i - 1] / operation[i + 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
    }
  }
  while (operation.includes('+') || operation.includes('-')) {
    for (let i = 0; i < operation.length; i++) {
      if (operation[i] === '+') {
        operation[i + 1] = Number(operation[i + 1]);
        operation[i - 1] = Number(operation[i - 1]);
        operation[i] = operation[i + 1];
        operation[i] += operation[i - 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
      if (operation[i] === '-') {
        operation[i] = operation[i - 1];
        operation[i] -= operation[i + 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
    }
  }
    if (operation[0] % 1 !== 0) {
    operationResult = Math.round(operation[0] * 100) / 100;
  } else {
    operationResult = operation[0];
  }
  return operationResult;
}

function reset() {
  operation = undefined;
  preOperation = undefined;
  currentOperation = undefined;
  lastKeyIndex = undefined;
  lastKey = undefined;
  operationResult = undefined;
  preOperationEl.textContent = ""
  currentOperationEl.textContent = "";
}