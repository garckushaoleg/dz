const key = '4AD5';

let IdOfMovedItem;

let addButton = $('#add');
let addForm = $('#add-form');
let area = $('#area');
let sticker = $('#sticker');

init();

function init() {
    if (getItemFromLocalStorage()) createSticker();

    addButton.click(onAddButtonClick)
}

//Обработчик на кнопку Добавить
function onAddButtonClick() {
    addButton.after(addForm.html());

    $('#save').click(onSaveButtonClick);

    $('#cancel').click(onCancelButtonClick);
}

//Обработчик на кнопку Сохранить
function onSaveButtonClick() {

    setItemToLocalStorage();

    createSticker();

}

//Создать стикер
function createSticker() {
    displayItemFromLocalStorage();

    $('.close-button').click(onCloseButtonClick);

    $('.sticker-title').mouseenter(onAppearanceOfCursorOverTitle);

    $('.sticker-title').mouseleave(onExitFromCursorArea);
}

//Получить значение с локального хранилища по ключу
function getItemFromLocalStorage() {
    return jQuery.parseJSON(localStorage.getItem(key));
}

//Записать значение в локальное хранилище по ключу
function setItemToLocalStorage() {
    let arrItem;
    
    if (getItemFromLocalStorage()) {
        arrItem = getItemFromLocalStorage();
    } else {
        arrItem = [];
    }

    arrItem.push({title: $('#title').val(), description: $('#description').val(), style: ''});
    localStorage.setItem(key, JSON.stringify(arrItem));
}

//Отобразить значение с локального хранилища по ключу
function displayItemFromLocalStorage() {
    let value = getItemFromLocalStorage();

    area.html('');
    value.forEach((item, index) => {
        if (item === null) return;
        area.append(sticker.html().replace('{{id}}', index)
                                          .replace('{{sticker-title}}', item.title)
                                          .replace('{{sticker-description}}', item.description));

        $( '#' + index ).attr('style', item.style);
    });
}

//Закрыть стикер и удалить значение с локального хранилища по ключу
function onCloseButtonClick(event) {
    let id = $(event.target).closest('div').attr('id');
    let arrItem = getItemFromLocalStorage();
    delete arrItem[id];
    localStorage.setItem(key, JSON.stringify(arrItem));
    $(event.target).closest('div').remove();
}

//Обработчик на появление курсора над заголовком
function onAppearanceOfCursorOverTitle(event) {
    let id = $(event.target).closest('div').attr('id');
    IdOfMovedItem = id;
    $( "#" + id ).draggable({ cancel: ".sticker-description" });
}

//Обработчик на выход курсора из области элемента
function onExitFromCursorArea() {
    let style = ($( "#" + IdOfMovedItem ).attr('style'));
    let value = getItemFromLocalStorage();
    value[IdOfMovedItem].style = style;

    localStorage.setItem(key, JSON.stringify(value));
}

//Закрыть форму добавления стикера
function onCancelButtonClick(event) {
    $(event.target).closest('div').remove();
}

