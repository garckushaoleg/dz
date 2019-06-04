import $ from 'jquery';

export default class Line {
    constructor(elId) {
        this.$el = $(elId);

        this.onLineClick = this.onLineClick.bind(this);
        this.$el.on('click', 'tr', this.onLineClick);
    }

    //Обработчик на клик по строке
    onLineClick(event) {
        let id = $(event.target).closest('tr').data('id');
        this.onClickOnLine(id);
    }
        
}