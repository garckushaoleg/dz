import $ from 'jquery';

export default class View {
    constructor(elId) {
        this.displayList();
        this.$el = $(elId);

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
        
            <tbody id="contactList"></tbody>
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