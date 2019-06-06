import $ from 'jquery';

export default class TodoListView {
    constructor() {
        this.displayList();
        this.$el = $('#todoList');

        this.render = this.render.bind(this);

        this.onLineClick = this.onLineClick.bind(this);
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);

        this.$el.on('click', 'button[delete-button]', this.onDeleteButtonClick);
        this.$el.on('click', 'tr', this.onLineClick);
    }

    displayList() {
        let table = $(
        `<table class="u-full-width">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                </tr>
            </thead>
        
            <tbody id="todoList"></tbody>
        </table>`
        );

        $(document.body).append(table);
    }

    //Обработчик на клик по строке
    onLineClick(event) {
        let id = $(event.target).closest('tr').data('id');
        this.onClickOnLine(id);
    }

    //Обработчик на клик по кнопке удаления
    onDeleteButtonClick(event) {
        let id = $(event.target).closest('tr').data('id');
        this.onClickOnButton(id);
    }

    render(data) {
        this.$el.html(`${data.map(this.renderItem).reverse().join('\n')}`)
    }

    renderItem(el) {
        let todo = (el.isDone) ? "completed-todo" : "incomplete-todo";

        return `<tr data-id="${el.id}" class=${todo}>
                <td>${el.id}</td>
                <td>${el.title}</td>
                <td><button delete-button>Delete</button></td>
                </tr>`
    }

    resetTodoList() {
        $('#title').val('');
    }
}