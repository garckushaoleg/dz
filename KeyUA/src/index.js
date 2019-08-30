import './css/main.css'
import './scss/main.scss'


const expMonth = document.getElementById('exp-month');
const expYear = document.getElementById('exp-year');
const trial = document.getElementById('trial');

if (expMonth.value == 'Month') {
    expMonth.classList.add('exp-month');
}

expMonth.addEventListener('click', getValue);
expYear.addEventListener('click', getValue);

const cardNumber = document.getElementById('card-number');
cardNumber.addEventListener('change', displayError);

const main = document.getElementById('main');
main.addEventListener('input', activateButton);

function displayError(e) {
    const errorBlock = document.getElementById('error-block');
    const div = document.getElementById('error-cart-first');

    if (!e.target.validity.valid) {
        errorBlock.classList.add('error-block-true');
        div.innerHTML = '<p>Minimum length 12</p> <p>Credit card number is not valid</p>';
    } else {
        div.innerHTML = '';
        errorBlock.classList.remove('error-block-true');
    }
}

function getValue(e) {
    const div = document.getElementById('error-cart-second');
    const errorBlock = document.getElementById('error-block');

    if (((e.target.value == '4 - April') && (expYear.value == '2030')) 
      || ((e.target.value == '2030') && (expMonth.value == '4 - April'))) {
        errorBlock.classList.add('error-block-true');
        expMonth.classList.add('error-month');
        expYear.classList.add('error-year');
        trial.classList.add('success-trial');
        div.innerHTML = 'You entered incorrect data';
    } else {
        expMonth.classList.remove('error-month');
        expYear.classList.remove('error-year');
        expMonth.classList.add('success-month');
        expYear.classList.add('success-year');
        trial.classList.add('success-trial');

        div.innerHTML = '';
        errorBlock.classList.remove('error-block-true');
    }
}

function activateButton() {
    const cardNumber = document.getElementById('card-number');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const confirm = document.getElementById('confirm');

    if ((!expMonth.classList.contains('error-month')) && (!expYear.classList.contains('error-year'))
         && (cardNumber.validity.valid) && (firstName.validity.valid) && (lastName.validity.valid)
         && (cardNumber.value != '') && (firstName.value != '') && (lastName.value != '')
         && (expMonth.value != 'Month') && (expYear.value != 'Year')) {
            confirm.classList.add('confirm');
         } else {
            confirm.classList.remove('confirm');
         }
}
