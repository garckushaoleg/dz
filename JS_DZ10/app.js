// JavaScript source code
function onAddContactBtnClick() {
    submitContact();
}

function addContact(contact) {
    const contactTr = document.createElement('tr');

    contactTr.innerHTML = contactTemplate.replace('{{name}}', contact.name || '-')
                                         .replace('{{phone}}', contact.phone || '-')
                                         .replace('{{age}}', contact.age || '-')
                                         .replace('{{delete}}', contact.buttonDelete);

    contactList.appendChild(contactTr);
    
}

//Обработчик (удаление строки)
function onDeleteLine(event) {
    if (event.target.hasAttribute('delete-button')) event.target.parentElement.parentElement.remove();
}

function submitContact() {
    const contact = {
        name: contactNameInput.value,
        phone: contactPhoneInput.value,
        age: contactAgeInput.value,
        buttonDelete: '<button delete-button>Delete</button>'
    }
    addContact(contact);
    resetContactForm();
}

function resetContactForm() {
    contactNameInput.value = '';
    contactPhoneInput.value = '';
    contactAgeInput.value = '';
}

const addContactBtn = document.getElementById('addContactBtn');
const contactsList = document.getElementById('contactList');
const contactNameInput = document.getElementById('nameInput');
const contactPhoneInput = document.getElementById('phoneInput');
const contactAgeInput = document.getElementById('ageInput');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;

addContactBtn.addEventListener('click', onAddContactBtnClick);
contactsList.addEventListener('click', onDeleteLine);