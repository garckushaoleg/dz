import $ from 'jquery';

export default class Delete {
    constructor(elId) {
        this.$el = $(elId);

        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
        this.$el.on('click', 'button[delete-button]', this.onDeleteButtonClick);
    }

    //Обработчик на клик по кнопке удаления
    onDeleteButtonClick(event) {
        let id = $(event.target).closest('tr').data('id');
        this.onClickOnButton(id);
    }

}