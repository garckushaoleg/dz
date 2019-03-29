// JavaScript source code
function onAddContactBtnClick() {
    submitContact();
}

function addContact(contact) {
    const contactTr = document.createElement('tr');    
    //Создаю кнопку удаления
    const deleteContacts = document.createElement('button');
    deleteContacts.textContent = 'Delete';

    contactTr.innerHTML = contactTemplate.replace('{{name}}', contact.name).replace('{{phone}}', contact.phone).replace('{{age}}', contact.age || '-');
    //Добавляю кнопку удаления
    contactTr.appendChild(deleteContacts);
    //Вешаю на кнопку обработчик
    deleteContacts.addEventListener('click', deleteLine);

    contactList.appendChild(contactTr);
    
}
//Обработчик (удаление строки)
function deleteLine(event) {
    event.target.parentElement.remove();
}

function submitContact() {
    const contact = {
        name: contactNameInput.value,
        phone: contactPhoneInput.value,
        age: contactAgeInput.value,
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