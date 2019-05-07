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
    addContactOnServer(contact);
    resetContactForm();
}

//Добавляем контакт на сервер
function addContactOnServer(contact) {
    fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    }).then(getContacts)
}

//Получаем контакты юзеров с сервера
function getContacts() {
    fetch(URL).then(response => response.json()).then(response => displayContacts(response));
}

//Отображаем полученные контакты
function displayContacts(contacts) {

    contactList.innerHTML = contacts.map(
        item => contactTemplate.replace('{{id}}', item.id || '-')
                               .replace('{{name}}', item.name || '-')
                               .replace('{{surname}}', item.surname || '-')
                               .replace('{{email}}', item.email || '-')
                               .replace('{{phone}}', item.phone || '-')).join('\n');

    contactArr = contacts;

    toggleBackground();
}

//Приводим содержимое форм к дефолту
function resetContactForm() {
    contactNameInput.value = '';
    contactSurnameInput.value = '';
    contactEmailInput.value = '';
    contactPhoneInput.value = '';
}

//Обработчик на клик 
function onLineClick(e) {
    let id = e.target.parentElement.children[0].textContent;

    rewriteLineOnServer(id);
}

//Перезаписываем строку на сервере
function rewriteLineOnServer(id) {
    contactArr.forEach(item => {
        if (item.id == id) {
            item.is_active = !item.is_active;
            fetch(URL + '/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(toggleBackground);
        }
    })
}


//Переключаем бэкграунд
function toggleBackground() {
    let arrElements = Array.prototype.slice.call(contactsList.children);

    contactArr.forEach((item) => {
        if (!item.is_active) {

            arrElements.forEach((elem) => {
                if (elem.children[0].textContent == item.id) elem.classList.add('background-tr')
            })

        } else {
            arrElements.forEach((elem) => {
                if (elem.children[0].textContent == item.id) elem.classList.remove('background-tr')
            })

        }

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
        deleteLineOnServer(id);
    }
}

//Удаляем строку на сервере
function deleteLineOnServer(id) {
    fetch(URL + '/' + id, {
        method: 'DELETE'
    }).then(getContacts);
}