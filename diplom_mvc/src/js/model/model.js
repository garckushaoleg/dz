import config from '../config';

export default class CategoriesModel {
    constructor() {
        this.config = config;
        this.setProductDataToLocalStorage();
        this.setCartDataToLocalStorage([]);
    }

    //Добавить данные по продуктам в локальное хранилище
    setProductDataToLocalStorage() {
        localStorage.setItem(config.keyProducts, JSON.stringify(config.products));
    }

    //Получить данные по продуктам с локального хранилища
    getProductDataFromLocalStorage() {
        return JSON.parse(localStorage.getItem(config.keyProducts));
    }

    //Добавить данные по корзине в локальное хранилище
    setCartDataToLocalStorage(product) {
        localStorage.setItem(config.keyCart, JSON.stringify(product));
    }

    //Получить данные по корзине с локального хранилища
    getCartDataFromLocalStorage() {
        return JSON.parse(localStorage.getItem(config.keyCart));
    }

    //Фильтровать продукты по категориям
    filterProductsByCategory(category) {
        let data = this.getProductDataFromLocalStorage();

        return data.filter((item) => item.category == category)
    }

    //Сортировать по ценам
    sortPrices(direction) {
        let data = this.getProductDataFromLocalStorage();
        switch (direction) {
            case 'ascending': return data.sort((a, b) => a.price-b.price);
            case 'descending': return data.sort((a, b) => b.price-a.price);
        }
    }

    //Добавить продукты в корзину
    addProductToCart(id) {
        let productsInCart = this.getCartDataFromLocalStorage();

        let productToAdd = this.getProductDataFromLocalStorage().find((item) => item.id == id);
        let sameProductIsAlreadyInCart = productsInCart.find((item) => item.id == productToAdd.id);

        if (sameProductIsAlreadyInCart) {
            let index = productsInCart.indexOf(sameProductIsAlreadyInCart);
            sameProductIsAlreadyInCart.quantity++;
            productsInCart.splice(index, 1, sameProductIsAlreadyInCart);
        } else productsInCart.push(productToAdd);

        this.setCartDataToLocalStorage(productsInCart);
    }

    //Удалить продукт с корзины
    removeProductFromCart(id) {
        let data = this.getCartDataFromLocalStorage();
        let productToBeRemoved = data.find((item) => item.id == id);
        let index = data.indexOf(productToBeRemoved);
        data.splice(index, 1);

        this.setCartDataToLocalStorage(data);
    }
}