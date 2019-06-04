import $ from 'jquery';

export default class Add {
    constructor(elId) {
        this.$el = $(elId);

        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        $('#addContactBtn').click(this.onAddButtonClick);
    }

    //Обработчик на клик по кнопке добавления
    onAddButtonClick() {
        const contact = {
            title: $('#title').val(),
            isDone: false
        }

        this.onClickButtonAdd(contact);
    }

}