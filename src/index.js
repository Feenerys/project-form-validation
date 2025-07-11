import "./styles.css";

const email = document.querySelector("#email");
const postalCodeField = document.querySelector("#postal-code");
const state = document.querySelector("#state");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password-conf");

const form = document.querySelector("form");
const error = document.querySelector(".error");

const fillStatus = {
  email: [false, "Please enter a valid email", email],
  postalCode: [false, "Please enter a valid postal code", postalCodeField],
  password: [false, "Please enter a valid password", password],
  passwordConfirmation: [
    false,
    "Please enter the same password",
    passwordConfirmation,
  ],
};

email.addEventListener("input", (event) => {
  email.className = "interact";
  if (email.validity.typeMismatch || email.value == "") {
    email.setCustomValidity("Expected a proper email");
    email.reportValidity();
    fillStatus.email[0] = false;
  } else {
    email.setCustomValidity("");
    fillStatus.email[0] = true;
  }
});

const postCodeConstraints = {
  nsw: [
    "^(1\\d{3}|2[0-4]\\d{2}|25\\d{2}|26(1[9]|[2-9]\\d)|27\\d{2}|28[0-8]\\d|289\\d|292[1-9]|29[3-9]\\d|299\\d)$",
    "For NSW, please enter a number between 1000–1999, 2000–2599, 2619–2899, or 2921–2999.",
  ],
  act: [
    "^(02\\d{2}|26(0\\d|1[0-8])|29(0\\d|1\\d|20))$",
    "For ACT, please enter a number between 0200–0299, 2600–2618, or 2900–2920.",
  ],
  vic: [
    "^(3\\d{3}|399[0-6]|8\\d{3})$",
    "For VIC, please enter a number between 3000–3996 or 8000–8999.",
  ],
  qld: [
    "^(4\\d{3}|9\\d{3})$",
    "For QLD, please enter a number between 4000–4999 or 9000–9999.",
  ],
  sa: [
    "^(5[0-7]\\d{2}|58\\d{2}|59\\d{2})$",
    "For SA, please enter a number between 5000–5799 or 5800–5999.",
  ],
  wa: [
    "^(6[0-6]\\d{2}|67([0-8]\\d|9[0-7])|68\\d{2}|69\\d{2})$",
    "For WA, please enter a number between 6000–6797 or 6800–6999.",
  ],
  tas: [
    "^(7[0-7]\\d{2}|78\\d{2}|79\\d{2})$",
    "For TAS, please enter a number between 7000–7799 or 7800–7999.",
  ],
  nt: [
    "^0(8\\d{2}|9\\d{2})$",
    "For NT, please enter a number between 0800–0899 or 0900–0999.",
  ],
};

postalCodeField.addEventListener("input", (e) => {
  const postCodeConstraint = new RegExp(
    postCodeConstraints[state.value][0],
    ""
  );

  if (postCodeConstraint.test(postalCodeField.value)) {
    postalCodeField.setCustomValidity("");
    postalCodeField.reportValidity();
    fillStatus.postalCode[0] = true;
  } else {
    postalCodeField.setCustomValidity(postCodeConstraints[state.value][1]);
    postalCodeField.reportValidity();
    postalCodeField.className = "interact";
    fillStatus.postalCode[0] = false;
  }
});

password.addEventListener("input", (e) => {
  if (password.value != "") {
    fillStatus.password[0] = true;
  } else {
    fillStatus.password[0] = false;
  }
});

passwordConfirmation.addEventListener("input", (e) => {
  if (password.value != passwordConfirmation.value) {
    console.log(password.value, passwordConfirmation.value);
    passwordConfirmation.setCustomValidity("Both passwords must match");
    passwordConfirmation.reportValidity();
    passwordConfirmation.className = "interact";
    fillStatus.passwordConfirmation[0] = false;
  } else {
    fillStatus.passwordConfirmation[0] = true;
    passwordConfirmation.setCustomValidity("");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  for (let input in fillStatus) {
    const status = fillStatus[input];
    if (!status[0]) {
      error.textContent = status[1];
      status[2].className = "interact";
      return;
    }
  }

  error.textContent = "Success";
});
