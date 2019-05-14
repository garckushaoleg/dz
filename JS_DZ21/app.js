const URL = 'http://fep-app.herokuapp.com/api/contacts';
const addContactBtn = document.getElementById('addContactBtn');
const contactsList = document.getElementById('contactList');
const contactNameInput = document.getElementById('nameInput');
const contactSurnameInput = document.getElementById('surnameInput');
const contactEmailInput = document.getElementById('emailInput');
const contactPhoneInput = document.getElementById('phoneInput');


const contactTemplate = document.getElementById('contactTemplate').innerHTML;
const editForm = document.getElementById('editForm').innerHTML;
const popup = document.getElementById('popup').innerHTML;

let editableString; // запоминаем какую строку редактируем

init();

function init() {
    addContactBtn.addEventListener('click', onClickOnAddButton);
    contactsList.addEventListener('click', onLineClick);
    contactsList.addEventListener('click', onClickOnDeleteButton);
    contactsList.addEventListener('click', onClickOnEditButton);
    contactsList.addEventListener('click', onClickOnSaveButton);
    document.body.addEventListener('click', onClickOnCloseButton);
}

//Обработчик на клик по кнопке добавления
function onClickOnAddButton() {
    submitContact();
}

//Добавляем контакт
function submitContact() {
    const contact = {
        name: contactNameInput.value,
        surname: contactSurnameInput.value,
        email: contactEmailInput.value,
        phone: contactPhoneInput.value,
        is_active: true
    }

    addContactOnServer(contact).then(getContacts);
    resetContactForm();
}

//Добавляем контакт на сервер
function addContactOnServer(contact) {
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    })
}

//Получаем контакты юзеров с сервера
function getContacts() {
    fetch(URL).then(response => response.json()).then(response => displayContacts(response));
}

//Отображаем полученные контакты
function displayContacts(contacts) {

    contactList.innerHTML = contacts.map(
        item => {

            return contactTemplate.replace('{{id}}', item.id)
                                  .replace('{{name}}', item.name || '-')
                                  .replace('{{surname}}', item.surname || '-')
                                  .replace('{{email}}', item.email || '-')
                                  .replace('{{phone}}', item.phone || '-')
        }).join('\n');
}

//Приводим содержимое форм к дефолту
function resetContactForm() {
    contactNameInput.value = '';
    contactSurnameInput.value = '';
    contactEmailInput.value = '';
    contactPhoneInput.value = '';
}

//Обработчик на клик по строке
function onLineClick(e) {
    let id = e.target.parentElement.children[0].textContent;

    if (~e.target.parentElement.innerHTML.indexOf('td')) {
        getContactById(id);
    }
}

//Получить контакт по айди
function getContactById(id) {
    fetch(URL + '/' + id).then(response => response.json()).then(response => displayContact(response))
}

//Показать контакт
function displayContact(response) {
    let ul = document.createElement('ul');
    ul.classList.add('popup');
    document.body.appendChild(ul);

    ul.innerHTML = popup.replace('{{id}}', response.id)
                        .replace('{{name}}', response.name)
                        .replace('{{surname}}', response.surname)
                        .replace('{{email}}', response.email)
                        .replace('{{phone}}', response.phone);
}

//Обработчик на клик по кнопке закрытия
function onClickOnCloseButton(e) {
    if (e.target.classList.contains('close-button')) {
        e.target.parentElement.remove();
    }
}

//Обработчик на клик по кнопке удаления
function onClickOnDeleteButton(e) {
    if (e.target.hasAttribute('delete-button')) {
        deleteLineOnServer(getId(e.target)).then(getContacts);
    }
}

//Получаем айди
function getId(element) {
    let tr = element.parentElement.parentElement;
    let id = tr.children[0].textContent.trim();
    return id
}

//Удаляем строку на сервере
function deleteLineOnServer(id) {
    return fetch(URL + '/' + id, {
        method: 'DELETE'
    });
}

//Обработчик на клик по кнопке редактирования
function onClickOnEditButton(e) {
    editableString = e.target.parentElement.parentElement; //запомнили строку

    if (e.target.hasAttribute('edit-button')) {
        fetch(URL + '/' + getId(e.target)).then(response => response.json())
                                          .then(response => addFormToEdit(response, editableString))
    }
}

//Добавить форму для редактирования
function addFormToEdit(contact, tr) {
    tr.innerHTML = editForm.replace('{{id}}', contact.id)
                           .replace('{{placeholderName}}', contact.name)
                           .replace('{{placeholderSurname}}', contact.surname)
                           .replace('{{placeholderEmail}}', contact.email)
                           .replace('{{placeholderPhone}}', contact.phone);
}

//Обработчик на клик по кнопке сохранения
function onClickOnSaveButton(e) {
    if (e.target.hasAttribute('save-button')) {

        saveEditedContact(getId(e.target));
    }
}

//Сохранить отредактированный контакт
function saveEditedContact(idValue) {
    const contactNameSaveInput = document.getElementById('nameSaveInput');
    const contactSurnameSaveInput = document.getElementById('surnameSaveInput');
    const contactEmailSaveInput = document.getElementById('emailSaveInput');
    const contactPhoneSaveInput = document.getElementById('phoneSaveInput');

    const contact = {
        id: idValue,
        name: contactNameSaveInput.value,
        surname: contactSurnameSaveInput.value,
        email: contactEmailSaveInput.value,
        phone: contactPhoneSaveInput.value,
        is_active: true
    }

    saveEditedContactToServer(contact).then(response => response.json())
                                      .then(response => getEditedContact(response.id));
}

//Сохранить отредактированный контакт на сервере
function saveEditedContactToServer(contact) {
    return fetch(URL + '/' + contact.id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    })
}

//Получить отредактированный контакт
function getEditedContact(id) {
    fetch(URL + '/' + id).then(response => response.json())
                         .then(response => displayEditedContact(response, editableString));
}

//Показать отредактированный контакт
function displayEditedContact(contact, tr) {
    tr.innerHTML = contactTemplate.replace('{{id}}', contact.id)
                                  .replace('{{name}}', contact.name || '-')
                                  .replace('{{surname}}', contact.surname || '-')
                                  .replace('{{email}}', contact.email || '-')
                                  .replace('{{phone}}', contact.phone || '-');
}
