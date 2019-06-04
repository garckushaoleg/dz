import $ from 'jquery';

export default class TodoView {
    constructor(elId) {
        this.$el = $(elId);

        this.render = this.render.bind(this);
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