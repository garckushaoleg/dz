const URL = 'http://fep-app.herokuapp.com/api/contacts';
const addContactBtn = document.getElementById('addContactBtn');
const contactsList = document.getElementById('contactList');
const contactNameInput = document.getElementById('nameInput');
const contactSurnameInput = document.getElementById('surnameInput');
const contactEmailInput = document.getElementById('emailInput');
const contactPhoneInput = document.getElementById('phoneInput');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;

let contactArr = [];

init();

function init() {
    addContactBtn.addEventListener('click', onClickOnAddButton);
    contactsList.addEventListener('click', onLineClick);
    contactsList.addEventListener('click', onClickOnDeleteButton);
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
    console.log(contact);
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
    let tr;

    contactList.innerHTML = contacts.map(
        item => {

            if (!item.is_active) {
                tr = contactTemplate.replace('{{class}}', 'class="background-tr"')
            } else {
                tr = contactTemplate.replace('{{class}}', '')
            }

            return tr.replace('{{id}}', item.id || '-')
                     .replace('{{name}}', item.name || '-')
                     .replace('{{surname}}', item.surname || '-')
                     .replace('{{email}}', item.email || '-')
                     .replace('{{phone}}', item.phone || '-')}).join('\n');

    contactArr = contacts;
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

    changeValueToOpposite(id);
}

//Изменяем значение is_active на противоположное
function changeValueToOpposite(id) {
    contactArr.forEach(item => {
        if (item.id == id) {
            item.is_active = !item.is_active;
            rewriteLineOnServer(id, item).then(getContacts);
        }
    })
}

//Перезаписываем строку на сервере
function rewriteLineOnServer(id, item) {
    return fetch(URL + '/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
}

//Обработчик на клик по кнопке удаления
function onClickOnDeleteButton(e) {
    getId(e.target);
}

//Получаем айди
function getId(element) {
    if (element.hasAttribute('delete-button')) {
        let tr = element.parentElement.parentElement;
        let id = tr.children[0].textContent;
        deleteLineOnServer(id).then(getContacts);
    }
}

//Удаляем строку на сервере
function deleteLineOnServer(id) {
    return fetch(URL + '/' + id, {
        method: 'DELETE'
    });
}