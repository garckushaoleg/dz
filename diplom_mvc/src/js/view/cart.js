export default class CartView {
    constructor() {
        this.shoppingCart = document.getElementById('shoppingCart');

        this.onCartClick = this.onCartClick.bind(this);
        this.shoppingCart.addEventListener('click', this.onCartClick);

        this.shop = document.getElementById('shop');

        this.onClickonDeleteButton = this.onClickonDeleteButton.bind(this);
        this.shop.addEventListener('click', this.onClickonDeleteButton);
    }

    //Обработчик на клик по корзине
    onCartClick() {
        this.onClickOnBasketButton();
    }

    //Отобразить продукты с корзины
    displayProductsFromCart(data) {
        let shop = document.getElementById('shop');
        let arr = [];

        let innerHeadHtml =
            `<table>
    <caption>SHOPPING CART</caption>
    <thead>
        <tr>
            <th></th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
        </tr>
    </thead>
    <tbody>`

        let innerBodyHtml = '';

        data.forEach(item => {
            arr.push(item.price * item.quantity);

            innerBodyHtml +=
                `<tr data-id='${item.id}'>
             <td class="product-image"><span class="${item.image}"></span></td>
             <td>${item.title}</td>
             <td>${item.quantity}</td>
             <td>${item.price * item.quantity},00 €</td>
             <td class="td-delete"><span data-delete class="delete"></span></td>
            </tr>`
        });

        let innerFootHtml =
            `<tfoot>
        <tr>
            <td colspan="3">ALL PRICE</td>
            <td colspan="2">${arr.reduce((sum, current) => sum + current, 0)},00 €</td>
        </tr>
    </tfoot>
        </tbody>
    </table>`

        shop.innerHTML = innerHeadHtml + innerBodyHtml + innerFootHtml;
    }

    //Обработчик на клик по кнопке удаления
    onClickonDeleteButton(e) {
        if (e.target.classList.contains('delete')) {
            let id = e.target.closest('tr[data-id]').dataset.id;
            this.onClickOnButtonRemoveFromBasket(id);
        }
    }
}