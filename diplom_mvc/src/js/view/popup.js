export default class PopupView {
    constructor() {
        this.shop = document.getElementById('shop');

        this.onClickAddToCartButton = this.onClickAddToCartButton.bind(this);

        this.shop.addEventListener('click', this.onClickAddToCartButton);
    }

    //Обработчик на клик по кнопке добавления в корзину
    onClickAddToCartButton(e) {
        if (e.target.classList.contains('cart')) {
            this.displayPopup();
            this.onClickOnButtonAddToCart(e.target.dataset.id);
        }
    }

    //Отобразить всплывающее окно
    displayPopup() {
        let div = document.createElement('div');
        div.className = 'popup';
        div.innerHTML = `<div>
    <p>Товар добавлен в корзину</p>
    <span id="closePopup"></span>
    </div>
    `;
        document.body.appendChild(div);

        let closeButton = document.getElementById('closePopup');
        closeButton.onclick = (e) => e.target.closest('.popup').remove()
    }
}