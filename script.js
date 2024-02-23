// dark theme
const toggleElement = document.querySelector('.themes__toggle');
const toggleDark = () => {
  toggleElement.classList.toggle('themes__toggle--isActive');
};
const toglleKeyWordDark = (event) => {
  if (event.key === 'Shift') {
    toggleDark();
  }
};
toggleElement?.addEventListener('click', toggleDark);
toggleElement?.addEventListener('keydown', toglleKeyWordDark);
// logic for calculator
let storedNumber = '';
let currentNumber = '';
let operation = '';
const resultElement = document.querySelector('.calc__result');
const keyElement = document.querySelectorAll('[data-type]');
const updateUi = (value) => {
  resultElement.innerText = !value ? '0' : value;
};
const numberButtonHandelr = (value) => {
  if (value === '.' && currentNumber.includes('.')) return;
  if (value === '0' && currentNumber) return;
  currentNumber += value;
  updateUi(currentNumber);
};
const resetHandeller = () => {
  storedNumber = '';
  currentNumber = '';
  operation = '';
  updateUi(currentNumber);
};
const backSpace = () => {
  if (!currentNumber || currentNumber === '0') {
    return;
  }
  if (currentNumber.length === 1) {
    currentNumber = '';
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }
  updateUi(currentNumber);
};
const executeOperation = () => {
    if (currentNumber && storedNumber && operation) {
      switch (operation) {
        case "+":
          storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
          break;
        case "-":
          storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
          break;
        case "*":
          storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
          break;
        case "/":
          storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
          break;
      }
  
      currentNumber = "";
      updateUi(storedNumber);
    }
  };
  
  const operationButtonHandler = (operationValue) => {
    if (!storedNumber && !currentNumber) return;
  
    if (currentNumber && !storedNumber) {
      storedNumber = currentNumber;
      currentNumber = "";
      operation = operationValue;
    } else if (storedNumber) {
      operation = operationValue;
  
      if (currentNumber) executeOperation();
    }
  };
  
//  const resetKeyWord = (event) => {
//     if (event.key === "C") {
//         resetHandeller();
//         return;
//       };
//     updateUi(currentnumber);
// };
//  const backSpaceKeyword = (event) => {
//     if (event.key === "") {
//         backSpace();
//         return;
//       };
// };
const keyElementHandelr = (element) => {
  const { type } = element.dataset;
  element.addEventListener('click', () => {
    if (type === 'number') {
      numberButtonHandelr(element.dataset.value);
    } else if (type === 'operation') {
      switch (element.dataset.value) {
        case 'c':
          resetHandeller();
          break;
        case 'Backspace':
          backSpace();
          break;
        case 'Enter':
          executeOperation();
          break;
        default:
          operationButtonHandler(element.dataset.value);
      }
    }
  });
  // element.addEventListener("keydown" , resetHandeller)
  // element.addEventListener("keydown" , backSpaceKeyword)
};
keyElement.forEach(keyElementHandelr);
const availableNumbers = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
  ];
  const availableOperations = ["+", "-", "*", "/"];
  const availableKeys = [
    ...availableNumbers,
    ...availableOperations,
    "Backspace",
    "Enter",
    "c",
  ];
  
  window.addEventListener("keydown", (event) => {
    //   keyboardWithoutHover(event.key);
    keyboardWithHover(event.key);
  });
  
  const keyboardWithoutHover = (key) => {
    if (availableNumbers.includes(key)) {
      numberButtonHandler(key);
    } else if (availableOperations.includes(key)) {
      operationButtonHandler(key);
    } else if (key === "Backspace") {
      deleteButtonHandler();
    } else if (key === "Enter") {
      executeOperation();
    } else if (key === "c") {
      resetButtonHandler();
    }
  };
  
  const keyboardWithHover = (key) => {
    if (availableKeys.includes(key)) {
      const elem = document.querySelector(`[data-value="${key}"]`);
  
      elem.classList.add("hover");
      elem.click();
      setTimeout(() => elem.classList.remove("hover"), 100);
    }
  };
  