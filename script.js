document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const tipButtons = document.querySelectorAll(".tip-grid__btn");
  const customTipInput = document.querySelector(".tip-grid__custom");
  const tipAmountElement = document.getElementById("tipAmount");
  const totalAmountElement = document.getElementById("totalAmount");
  const errorMessage = document.querySelector(".input-group__error-message");
  const resetButton = document.querySelector(".calculator__reset");

  // Helper function to get current tip percentage
  function getCurrentTipPercentage() {
    const activeTipBtn = document.querySelector(".tip-grid__btn.active");
    const customTipValue = parseFloat(customTipInput.value);
    // Return 0 if no tip is selected
    return activeTipBtn ? 
      parseFloat(activeTipBtn.getAttribute("data-tip")) : 
      (isNaN(customTipValue) ? 0 : customTipValue);
  }

  // Validates the people input and shows/hides error message
  function validatePeopleInput(showBorder = true) {
    if (peopleInput.value === "0" || peopleInput.value === "") {
      errorMessage.classList.add("visible");
      peopleInput.classList.add("invalid");
      peopleInput.classList.remove("valid");
    } else {
      errorMessage.classList.remove("visible");
      peopleInput.classList.remove("invalid");
      peopleInput.classList.toggle("valid", showBorder);
    }
  }

  // Resets all inputs and calculated values to their initial state
  function resetCalculator() {
    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";
    tipAmountElement.textContent = "0.00";
    totalAmountElement.textContent = "0.00";
    errorMessage.classList.remove("visible");
    peopleInput.classList.remove("invalid", "valid");
    tipButtons.forEach((btn) => btn.classList.remove("active"));
  }

  // Calculates tip amount and total per person
  function calculateTip(tipPercentage) {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);

    // Only check bill and people values, allow tipPercentage to be 0
    if (isNaN(bill) || isNaN(people) || people <= 0) {
      tipAmountElement.textContent = "0.00";
      totalAmountElement.textContent = "0.00";
      return;
    }

    // Calculate tip and total amounts per person
    const tipAmount = (bill * (tipPercentage / 100)) / people;
    const totalAmount = bill / people + tipAmount;

    // Update the display with formatted numbers
    tipAmountElement.textContent = tipAmount.toFixed(2);
    totalAmountElement.textContent = totalAmount.toFixed(2);
  }

  // Validates inputs and triggers calculation if valid
  function validateAndCalculate(tipPercentage) {
    // Show error if bill exists but people input is invalid
    if (
      billInput.value &&
      (peopleInput.value === "0" || peopleInput.value === "")
    ) {
      validatePeopleInput(true);
    }
    if (!isNaN(tipPercentage)) {
      calculateTip(tipPercentage);
    }
  }

  // Event Listeners

  // Handle tip button clicks
  tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active state from all buttons
      tipButtons.forEach((btn) => btn.classList.remove("active"));
      // Set clicked button as active
      button.classList.add("active");
      customTipInput.value = ""; // Reset custom input field

      const tipPercentage = parseFloat(button.getAttribute("data-tip"));
      validateAndCalculate(tipPercentage);
    });
  });

  // Handle custom tip input
  customTipInput.addEventListener("input", () => {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    const tipPercentage = customTipInput.value === "" ? 0 : parseFloat(customTipInput.value);
    validateAndCalculate(tipPercentage);
  });

  // Recalculate when bill amount changes
  billInput.addEventListener("input", () => {
    validateAndCalculate(getCurrentTipPercentage());
  });

  // Handle people input changes
  peopleInput.addEventListener("input", () => {
    validatePeopleInput(true);
    validateAndCalculate(getCurrentTipPercentage());
  });

  // Remove validation styling when people input loses focus
  peopleInput.addEventListener("blur", () => validatePeopleInput(false));

  // Reset button handler
  resetButton.addEventListener("click", resetCalculator);
});
