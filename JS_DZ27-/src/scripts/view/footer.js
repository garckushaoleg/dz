import $ from 'jquery';

export default class TodoListFooter {
    constructor() {
        this.displayFooter();

        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        $('#addButton').click(this.onAddButtonClick);
    }

    displayFooter() {
        let $tfoot = $(
            `<tfoot>
                <tr>
                    <td colspan="3" class="table-input">
                        <input type="text" id='title'>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="table-add-button">
                        <button id="addButton">Add Todo</button>
                    </td>
                </tr>
            </tfoot>`
        );

        $('.u-full-width').append($tfoot);
    }

    //Обработчик на клик по кнопке добавления
    onAddButtonClick() {
        const todo = {
            title: $('#title').val(),
            isDone: false
        }

        this.onClickButtonAdd(todo);
    }
}