import $ from 'jquery';

export default class TodoView {
    constructor(elId) {
        this.$el = $(elId);

        this.onElementClick = this.onElementClick.bind(this);
        this.render = this.render.bind(this);

        this.$el.on('click', 'button[delete-button]', this.onElementClick);
    }

    onElementClick() {
        const id = $(event.target).closest('tr').data('id');
        this.onClick(id);
    }

    render(data) {
        this.$el.html(`${data.map(this.renderItem).join('\n')}`)
    }

    renderItem(el) {
        return `<tr data-id="${el.id}">
                <td>${el.id}</td>
                <td>${el.name}</td>
                <td>${el.surname}</td>
                <td>${el.email}</td>
                <td>${el.phone}</td>
                <td><button delete-button>Delete</button></td>
                </tr>`
    }
}