let key = 0;

init();

function init() {
    displayExistingItems();

    $('#add').click(onAddButtonClick)
}

//Показать уже имеющиеся значения из локального хранилища
function displayExistingItems() {
    if (localStorage.length>0) {
        for (let i=0; i<localStorage.length; i++) {
            key = localStorage.key(i);

            createSticker();
        }

        key = localStorage.length;
    }
}

//Обработчик на кнопку Добавить
function onAddButtonClick() {
    $('#add').after($('#add-form').html());

    $('#save').click(onSaveButtonClick);

    $('#cancel').click(onCancelButtonClick);
}

//Обработчик на кнопку Сохранить
function onSaveButtonClick() {

    setItemToLocalStorage();

    createSticker();

    key++;
    
}

//Создать стикер
function createSticker() {
    displayItemFromLocalStorage();

    $('.close-button').click(onCloseButtonClick);

    $('.sticker-title').mouseenter(onAppearanceOfCursorOverTitle);
}

//Записать значение в локальное хранилище по ключу
function setItemToLocalStorage() {
    localStorage.setItem(key, JSON.stringify({title: $('#title').val(), description: $('#description').val(), style: ''}));
}

//Отобразить значение с локального хранилища по ключу
function displayItemFromLocalStorage() {
    let value = jQuery.parseJSON(localStorage.getItem(key));

    $('#area').append($('#sticker').html().replace('{{id}}', key)
                                          .replace('{{sticker-title}}', value.title)
                                          .replace('{{sticker-description}}', value.description));

    $('#' + key).attr('style', value.style);
}

//Закрыть стикер и удалить значение с локального хранилища по ключу
function onCloseButtonClick(event) {
    let id = $(event.target).closest('div').attr('id')
    localStorage.removeItem(id);
    $(event.target).closest('div').remove();
}

//Обработчик на появление курсора над заголовком
function  onAppearanceOfCursorOverTitle(event) {
    let id = $(event.target).closest('div').attr('id');
    $( "#" + id ).draggable({ cancel: ".sticker-description" });

    let style = ($( "#" + id ).attr('style'));
    let value = jQuery.parseJSON(localStorage.getItem(id));
    localStorage.setItem(id, JSON.stringify({title: value.title, description: value.description, style: style}));
}

//Закрыть форму добавления стикера
function onCancelButtonClick(event) {
    $(event.target).closest('div').remove();
}

