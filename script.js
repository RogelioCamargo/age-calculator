const submitButton = document.querySelector(".ac__submit-button");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  // remove any existing error styling
  removeErrorStyling();
  // ensure there are no empty fields
  const form = document.querySelector(".ac__form");
  const data = new FormData(form);

  // verify that all fields are filled out
  let index = 0,
    errorFound = false;
  for (const [name, value] of data) {
    if (value === "") {
      generateErrorMessage(name, "This field is required");
      errorFound = true;
    }
    index++;
  }

  if (errorFound) {
    addErrorStyling();
    return;
  }

  const day = parseInt(data.get("day"));
  const month = parseInt(data.get("month"));
  const year = parseInt(data.get("year"));

  // check if month is valid
  if (month < 1 || month > 12) {
    generateErrorMessage("month", "Must be a valid month");
    errorFound = true;
  }
  // check if day is valid
  if (day < 1 || day > 31) {
    generateErrorMessage("day", "Must be a valid day");
    errorFound = true;
    // check if valid month and day
  } else if (month >= 1 && month <= 12) {
    // check if leap year
    if (year % 4 === 0 && year % 100 !== 0) {
      const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (day > daysInMonth[month - 1] || day < 1) {
        generateErrorMessage("day", "Must be a valid day");
        errorFound = true;
      }
    } else {
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (day > daysInMonth[month - 1] || day < 1) {
        generateErrorMessage("day", "Must be a valid day");
        errorFound = true;
      }
    }
  }

  // check if year is valid
  if (year > new Date().getFullYear()) {
    generateErrorMessage("year", "Must be in the past");
    errorFound = true;
  }

  if (errorFound) {
    addErrorStyling();
    return;
  }

	// calculate age in terms of years, months, and days from birthday
	const today = new Date();
	const birthday = new Date(year, month - 1, day);
	// calculate raw differences
	const age = today.getFullYear() - birthday.getFullYear();
	const monthDifference = today.getMonth() - birthday.getMonth();
	const dayDifference = today.getDate() - birthday.getDate();
	let ageInYears = age;
	let ageInMonths = monthDifference;
	let ageInDays = dayDifference;

	// adject years and months if birthday hasn't occurred this month
	if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
		ageInYears--;
		ageInMonths = 12 + monthDifference;
	}
	if (dayDifference < 0) {
    ageInMonths--;
		// calculate the number of days between today and last month
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    ageInDays += (today - lastMonth) / (1000 * 60 * 60 * 24);
  }

	// display age
	const ageDisplay = document.querySelector(".ac__result-years");
	ageDisplay.textContent = ageInYears;
	const ageDisplayMonths = document.querySelector(".ac__result-months");
	ageDisplayMonths.textContent = ageInMonths;
	const ageDisplayDays = document.querySelector(".ac__result-days");
	ageDisplayDays.textContent = ageInDays;
});

function generateErrorMessage(field, message) {
  if (!["day", "month", "year"].includes(field)) {
    throw new Error("Invalid field");
  }
  const errorMessage = document.createElement("span");
  errorMessage.classList.add("ac__error-message");
  errorMessage.textContent = message;

  const input = document.querySelector(`.ac__field-input[name=${field}]`);
  input.after(errorMessage);
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
