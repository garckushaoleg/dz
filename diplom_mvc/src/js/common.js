import CategoriesView from './view/categories'
import ShopModel from './model/model'
import PopupView from './view/popup'
import CartView from './view/cart'

export default class ShopController {
    constructor() {
        this.view = new CategoriesView();

        this.model = new ShopModel();

        this.popup = new PopupView();

        this.cart = new CartView();

        this.view.displayAllProducts(this.model.filterProductsByCategory('men'));
        this.view.displayAllProducts(this.model.filterProductsByCategory('women'));
        this.view.displayAllProducts(this.model.filterProductsByCategory('children'));

        this.view.copyEntireInternalHTML();

        this.view.onClickOnSortButton = (direction) => {
            let data = this.model.sortPrices(direction);
            this.view.displayProductsAfterSorting(data);
        }

        this.popup.onClickOnButtonAddToCart = (id) => this.model.addProductToCart(id);

        this.cart.onClickOnBasketButton = () => this.displayProducts();

        this.cart.onClickOnButtonRemoveFromBasket = (id) => {
            this.model.removeProductFromCart(id);
            this.displayProducts();
        }
    }

    //Отобразить продукты с корзины
    displayProducts() {
        let data = this.model.getCartDataFromLocalStorage();
        this.cart.displayProductsFromCart(data);
    }

}