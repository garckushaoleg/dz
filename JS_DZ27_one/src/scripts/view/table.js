import $ from 'jquery';

export default class Table {
    constructor() {
        this.displayTable();
    }

    displayTable() {
        this.$el = $(
            `<table class="u-full-width">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                </tr>
            </thead>
        
            <tbody id="contactList"></tbody>
        
            <tfoot>
                <tr>
                    <td>
                                
                    </td>
                    <td>
                        <input type="text" id='title'>
                    </td>
                    </td>
                </tr>
                <tr">
                <td colspan="2" class="table-footer">
                    <button id="addContactBtn">Add Contact</button>
                </td>
            </tr>
            </tfoot>
        </table>`
        );

        $(document.body).append(this.$el);
    }
}