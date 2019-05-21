$(function () {
    const URL = 'http://fep-app.herokuapp.com/api/contacts',
        contactTemplate = $('#contactTemplate').html(),
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        phoneRegex = /^((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    let dialog, form,
        name = $("#name"),
        surname = $("#surname"),
        email = $("#email"),
        phone = $("#phone"),
        tbody = $("#users tbody"),
        dialogForm = $("#dialog-form"),
        createUserButton = $("#create-user"),
        allFields = $([]).add(name).add(surname).add(email).add(phone),
        tips = $(".validateTips"),
        hiddenField = $("#hidden-field");

    //Приводим содержимое форм к дефолту
    function resetContactForm() {
        name.val('');
        surname.val('');
        email.val('');
        phone.val('');
    }

    function updateTips(t) {
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Length of " + n + " must be between " +
                min + " and " + max + ".");
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }

    function validate() {
        let valid = true;
        allFields.removeClass("ui-state-error");

        valid = valid && checkLength(name, "username", 3, 16);
        valid = valid && checkLength(surname, "username", 3, 16);
        valid = valid && checkLength(email, "email", 6, 80);
        valid = valid && checkLength(phone, "phone", 5, 16);

        valid = valid && checkRegexp(name, /^[a-z]([0-9a-z_\s])+$/i, "Name may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
        valid = valid && checkRegexp(surname, /^[a-z]([0-9a-z_\s])+$/i, "Surname may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
        valid = valid && checkRegexp(email, emailRegex, "eg. ui@jquery.com");
        valid = valid && checkRegexp(phone, phoneRegex, "Phone number should be +38xxxxxxxxxx");

        return valid;
    }

    //Обработчик на клик по кнопке создать
    function onCreateButtonClick() {
        if (validate()) {

            if (hiddenField.data('idOfEditedItem')) {
                saveEditedContactToServer();

            } else {
                saveContactToServer();
            }
            hiddenField.data('idOfEditedItem', 0);
        }
    }

    //Сохранить отредактированный контакт на сервере
    function saveEditedContactToServer() {
        let contact = {
            id: hiddenField.data('idOfEditedItem'),
            name: name.val(),
            surname: surname.val(),
            email: email.val(),
            phone: phone.val(),
            is_active: true
        }
        $.ajax({
            url: URL + '/' + hiddenField.data('idOfEditedItem'),
            type: "PUT",
            data: JSON.stringify(contact),
            contentType: "application/json",
            dataType: "json",
            success: getContacts
        })
    }

    //Сохранить контакт на сервере
    function saveContactToServer() {
        let contact = {
            name: name.val(),
            surname: surname.val(),
            email: email.val(),
            phone: phone.val(),
            is_active: true
        }

        $.ajax({
            url: URL,
            type: "POST",
            data: JSON.stringify(contact),
            contentType: "application/json",
            dataType: "json",
            success: getContacts
        })
    }

    //Получаем контакты с сервера
    function getContacts() {
        jQuery.get(URL).done(response => addUser(response));
    }

    //Рендерим контакты
    function addUser(contacts) {

        tbody.html(contacts.map(
            item => {

                return contactTemplate.replace('{{data-id}}', item.id)
                    .replace('{{id}}', item.id)
                    .replace('{{name}}', item.name || '-')
                    .replace('{{surname}}', item.surname || '-')
                    .replace('{{email}}', item.email || '-')
                    .replace('{{phone}}', item.phone || '-')
            }).join('\n'));
        dialog.dialog("close");

        $("button[delete-button]").click(onDeleteButtonClick);
        $("button[edit-button]").click(onEditButtonClick);
    }

    //Обработчик на клик по кнопке удаления
    function onDeleteButtonClick(event) {
        deleteLineOnServer(getId(event.target));
    }

    //Удаляем строку на сервере
    function deleteLineOnServer(id) {
        return $.ajax({
            url: URL + '/' + id,
            type: "DELETE",
            success: getContacts
        });
    }

    //Обработчик на клик по кнопке редактирования
    function onEditButtonClick(event) {
        dialog.dialog("open");

        hiddenField.data('idOfEditedItem', getId(event.target));

        jQuery.get(URL + '/' + getId(event.target)).done(response => displayCurrentContact(response));
    }

    //Показать актуальный контакт
    function displayCurrentContact(contact) {
        name.val(contact.name);
        surname.val(contact.surname);
        email.val(contact.email);
        phone.val(contact.phone);
    }

    //Получаем айди
    function getId(element) {
        return $(element).closest('tr[data-id]').data('id');
    }


    resetContactForm();
    dialog = dialogForm.dialog({
        autoOpen: false,
        height: 500,
        width: 400,
        modal: true,
        buttons: {
            "Create": onCreateButtonClick,
            Cancel: function () {
                dialog.dialog("close");
            }
        },
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        onCreateButtonClick(event);
    });

    createUserButton.button().on("click", function () {
        dialog.dialog("open");
    });
});