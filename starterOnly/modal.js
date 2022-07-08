function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll('.close-modal');
const firstname = document.getElementById("first");
const lastname = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkboxes = document.querySelectorAll(".tournament");
const termOfUse = document.getElementById("checkbox1");
const form = document.getElementById("form-signup");
const confirmation = document.getElementById("confirmation");


/** REGEX **/
const regexName = value => /^([a-zA-Z]){2,}$/.test(value);
const regexEmail = value => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(value);
const regexNumber = value => /^([0-9]){1,}$/.test(value);
const checkBirthdate = value => new Date(value) < new Date();

/**
 * Open modal form
 * 
 * @returns 
 */
const launchModal = () => {
  modalbg.style.display = "block";
  form.style.display = "block";
  confirmation.style.display = "none";
}

/**
 * Close modal form
 * 
 * @returns 
 */
const closeModal = () => modalbg.style.display = "none";

/**
 * Check each element, value of this element and return validation true or false
 * 
 * @param {HTMLElement} input 
 * @param {Any} value 
 * @returns Boolean
 */
const check = (input, value) => {
  console.log(input.value, value)
  input.parentNode.setAttribute("data-error-visible", !value);
  return value;
}

/**
 * Check each tournament class and return true if at least one checkbox is checked
 * 
 * @returns Boolean
 */
const checkTournament = () => {
  let result = false;
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      result = true
    }
  })
  return result;
}

/**
 * Validation Form
 * 
 * @param {*} event 
 */
const validate = event => {
  event.preventDefault();

  if (inputsValidated()) {
    // display confirmation message
    form.style.display = "none";
    confirmation.style.display = "flex";
  }
}

/**
 * Check validation for each input
 * 
 * @returns Boolean
 */
 const inputsValidated = () => {
  return check(firstname, regexName(firstname.value)) && check(lastname, regexName(lastname.value)) &&
    check(email, regexEmail(email.value)) && check(birthDate, checkBirthdate(birthDate.value)) && 
    check(quantity, regexNumber(quantity.value)) && checkTournament() && termOfUse.checked;
}

/***  EVENTS  ***/

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.forEach(btn => btn.addEventListener("click", closeModal));

firstname.addEventListener('input', () => check(firstname, regexName(firstname.value)))

lastname.addEventListener('input', () => check(lastname, regexName(lastname.value)))

email.addEventListener('input', () => check(email, regexEmail(email.value)))

birthDate.addEventListener('input', () => check(birthDate, checkBirthdate(birthDate.value)))

quantity.addEventListener('input', () => check(quantity, regexNumber(quantity.value)))

form.addEventListener('submit', event => validate(event))