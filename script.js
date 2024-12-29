// Get DOM elements
const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll(".tip-grid__btn");
const customTipInput = document.querySelector(".tip-grid__custom");
const tipAmountElement = document.getElementById("tipAmount");
const totalAmountElement = document.getElementById("totalAmount");
const errorMessage = document.querySelector(".input-group__error-message");
const resetButton = document.querySelector(".calculator__reset");

// Helper function to format number to 2 decimal places
const formatAmount = number => number.toFixed(2);

// Helper function to parse input value safely
const parseInputValue = input => (input.value === "" ? 0 : parseFloat(input.value));

// Helper function to get current tip percentage
function getCurrentTipPercentage() {
  const activeTipBtn = document.querySelector(".tip-grid__btn.active");
  return activeTipBtn ? 
    parseFloat(activeTipBtn.getAttribute("data-tip")) : 
    parseInputValue(customTipInput);
}

// Calculate and update results
function updateResults() {
  const bill = parseInputValue(billInput);
  const people = parseInputValue(peopleInput);
  const tipPercentage = getCurrentTipPercentage();

  if (bill === 0 || people === 0) {
    tipAmountElement.textContent = "0.00";
    totalAmountElement.textContent = "0.00";
    return;
  }

  const tipAmount = (bill * (tipPercentage / 100)) / people;
  const totalAmount = (bill / people) + tipAmount;

  tipAmountElement.textContent = formatAmount(tipAmount);
  totalAmountElement.textContent = formatAmount(totalAmount);
}

// Handle input validation and UI updates
function handlePeopleInput(showBorder = true) {
  const isEmpty = peopleInput.value === "" || peopleInput.value === "0";
  errorMessage.classList.toggle("visible", isEmpty);
  peopleInput.classList.toggle("invalid", isEmpty);
  peopleInput.classList.toggle("valid", !isEmpty && showBorder);
  updateResults();
}

// Reset all inputs and results
function resetCalculator() {
  [billInput, peopleInput, customTipInput].forEach(input => input.value = "");
  tipButtons.forEach(btn => btn.classList.remove("active"));
  errorMessage.classList.remove("visible");
  peopleInput.classList.remove("invalid", "valid");
  tipAmountElement.textContent = "0.00";
  totalAmountElement.textContent = "0.00";
}

// Event Listeners
tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    tipButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    customTipInput.value = "";
    updateResults();
  });
});

[billInput, customTipInput].forEach(input => {
  input.addEventListener("input", updateResults);
});

peopleInput.addEventListener("input", () => handlePeopleInput(true));
peopleInput.addEventListener("blur", () => handlePeopleInput(false));
resetButton.addEventListener("click", resetCalculator);
