document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const tipButtons = document.querySelectorAll(".tip-grid__btn");
  const customTipInput = document.querySelector(".tip-grid__custom");
  const tipAmountElement = document.getElementById("tipAmount");
  const totalAmountElement = document.getElementById("totalAmount");
  const errorMessage = document.querySelector(".input-group__error-message");
  const resetButton = document.querySelector(".calculator__reset");

  function validatePeopleInput(showBorder = true) {
    if (peopleInput.value === "0" || peopleInput.value === "") {
      errorMessage.style.display = "inline";
      peopleInput.classList.add("invalid");
      peopleInput.classList.remove("valid");
    } else {
      errorMessage.style.display = "none";
      peopleInput.classList.remove("invalid");
      peopleInput.classList.toggle("valid", showBorder);
    }
  }

  function calculateTip(tipPercentage) {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);

    if (isNaN(bill) || isNaN(people) || people <= 0) {
      return;
    }

    const tipAmount = (bill * (tipPercentage / 100)) / people;
    const totalAmount = bill / people + tipAmount;

    tipAmountElement.textContent = tipAmount.toFixed(2);
    totalAmountElement.textContent = totalAmount.toFixed(2);
  }

  tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tipPercentage = parseFloat(button.getAttribute("data-tip"));
      calculateTip(tipPercentage);
    });
  });

  customTipInput.addEventListener("input", () => {
    const tipPercentage = parseFloat(customTipInput.value);
    if (!isNaN(tipPercentage)) {
      calculateTip(tipPercentage);
    }
  });

  peopleInput.addEventListener("input", () => validatePeopleInput(true));
  peopleInput.addEventListener("blur", () => validatePeopleInput(false));

  resetButton.addEventListener("click", () => {
    tipAmountElement.textContent = "0.00";
    totalAmountElement.textContent = "0.00";
    errorMessage.style.display = "none";
    peopleInput.classList.remove("invalid", "valid");
  });
});
