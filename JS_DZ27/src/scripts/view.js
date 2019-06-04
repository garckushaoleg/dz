import $ from 'jquery';

export default class TodoView {
    constructor(elId) {
        this.$el = $(elId);

        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
        this.onLineClick = this.onLineClick.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.render = this.render.bind(this);

        this.$el.on('click', 'button[delete-button]', this.onDeleteButtonClick);
        this.$el.on('click', 'tr', this.onLineClick);
        $('#addContactBtn').click(this.onAddButtonClick);
    }

    //Обработчик на клик по кнопке удаления
    onDeleteButtonClick(event) {
        this.onClickOnButton(this.getId(event));
    }

    //Обработчик на клик по строке
    onLineClick(event) {
        this.onClickOnLine(this.getId(event));
    }
    
    //Получить айди
    getId(event) {
        return $(event.target).closest('tr').data('id');
    }

    //Обработчик на клик по кнопке добавления
    onAddButtonClick() {
        const contact = {
            title: $('#title').val(),
            isDone: false
        }

        this.onClickButtonAdd(contact);
    }

    render(data) {
        this.$el.html(`${data.map(this.renderItem).reverse().join('\n')}`)
    }

    renderItem(el) {
        let task = (el.isDone) ? "completed-task" : "incomplete-task";

        return `<tr data-id="${el.id}" class=${task}>
                <td>${el.id}</td>
                <td>${el.title}</td>
                <td><button delete-button>Delete</button></td>
                </tr>`
    }

    resetContactForm() {
        $('#title').val('');
    }
}