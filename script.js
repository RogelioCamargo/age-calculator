const submitButton = document.querySelector(".ac__submit-button");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  // remove any existing error styling
  removeErrorStyling();
  // ensure there are no empty fields
  const form = document.querySelector(".ac__form");
  const data = new FormData(form);
  const inputs = document.querySelectorAll(".ac__field-input");
  const [dayField, monthField, yearField] = inputs;
  console.log(yearField.value);

  let index = 0,
    errorFound = false;
  for (const [_, value] of data) {
    if (value === "") {
      const errorMessage = generateErrorMessage("This field is required");
      inputs[index].after(errorMessage);
      errorFound = true;
    }
    index++;
  }

  const day = data.get("day");
  const month = data.get("month");
  const year = data.get("year");
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // check if month is valid
  if (month < 1 || month > 12) {
    const errorMessage = generateErrorMessage("Must be a valid month");
    monthField.after(errorMessage);
    monthField.classList.add("ac__field-input--error");
    errorFound = true;
  }
  // check if day is valid
  if (day < 1 || day > 31) {
    const errorMessage = generateErrorMessage("Must be a valid day");
    dayField.after(errorMessage);
    dayField.classList.add("ac__field-input--error");
    errorFound = true;
  }
  // check if leap year
  if (month === 2) {
    if (year % 4 === 0 && year % 100 !== 0) {
      if (day > 29) {
        const errorMessage = generateErrorMessage("Must be a valid day");
        dayField.after(errorMessage);
        dayField.classList.add("ac__field-input--error");
        errorFound = true;
      }
    }
  } else if (day > daysInMonth[month - 1]) {
    const errorMessage = generateErrorMessage("Must be a valid day");
    dayField.after(errorMessage);
    dayField.classList.add("ac__field-input--error");
    errorFound = true;
  }

  // check if year is valid
  if (year > new Date().getFullYear()) {
    const errorMessage = generateErrorMessage("Must be in the past");
    yearField.after(errorMessage);
    yearField.classList.add("ac__field-input--error");
  }

  if (errorFound) {
    addErrorStyling();
    return;
  }
});

function generateErrorMessage(message) {
  const errorMessage = document.createElement("span");
  errorMessage.classList.add("ac__error-message");
  errorMessage.textContent = message;
  return errorMessage;
}

function removeErrorStyling() {
  const formLabels = document.querySelectorAll(".ac__field-label");
  const formInputs = document.querySelectorAll(".ac__field-input");
  const errorMessages = document.querySelectorAll(".ac__error-message");
  formInputs.forEach((input, index) => {
    formLabels[index].classList.remove("ac__field-label--error");
    input.classList.remove("ac__field-input--error");
  });
  errorMessages.forEach((message) => {
    message.remove();
  });
}

function addErrorStyling() {
  const formLabels = document.querySelectorAll(".ac__field-label");
  const formInputs = document.querySelectorAll(".ac__field-input");
  formInputs.forEach((input, index) => {
    formLabels[index].classList.add("ac__field-label--error");
    input.classList.add("ac__field-input--error");
  });
}
