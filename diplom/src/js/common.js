const keyProducts = 'PRODUCTS';
const keyCart = 'CART';
const products = [
    {
        id: 1,
        title: "MAN'S T-SHIRTS",
        category: 'men',
        price: 5,
        image: 'Livello2',
        quantity: 1
    },
    {
        id: 2,
        title: 'PANTS FORCLAZ',
        category: 'men',
        price: 30,
        image: 'Livello3',
        quantity: 1
    },
    {
        id: 3,
        title: 'BACKPACK',
        category: 'men',
        price: 60,
        image: 'Livello4',
        quantity: 1
    },
    {
        id: 4,
        title: 'GIACKET',
        category: 'women',
        price: 60,
        image: 'Livello5',
        quantity: 1
    },
    {
        id: 5,
        title: 'TREKKING SHOES',
        category: 'women',
        price: 80,
        image: 'Livello6',
        quantity: 1
    },
    {
        id: 6,
        title: "WOMEN'S T-SHIRT",
        category: 'women',
        price: 20,
        image: 'Livello7',
        quantity: 1
    },
    {
        id: 7,
        title: 'CHILDREN DRESS',
        category: 'children',
        price: 8,
        image: 'Livello8',
        quantity: 1
    },
    {
        id: 8,
        title: 'BABY SUIT',
        category: 'children',
        price: 3,
        image: 'Livello9',
        quantity: 1
    },
    {
        id: 9,
        title: "CHILDREN'S SHOES",
        category: 'children',
        price: 55,
        image: 'Livello10',
        quantity: 1
    }
]

let shop = document.getElementById('shop');
let prevHTML = shop.innerHTML;

let ascending = document.getElementById('ascending');

let allCategories = document.getElementById('allCategories');

let controls = document.getElementById('controls');

let shoppingCart = document.getElementById('shoppingCart');

controls.addEventListener('click', onControlPanelClick);
shop.addEventListener('click', addProductToCart);
shop.addEventListener('click', displayPopup);
shop.addEventListener('click', removeProductFromCart);
shoppingCart.addEventListener('click', displayProductsFromCart);

function init() {
    setProductDataToLocalStorage();
    setCartDataToLocalStorage([]);
    displayAllCategories();
}

//Показать все категории
function displayAllCategories() {
    let maleCategory = document.getElementById('maleCategory');
    let femaleCategory = document.getElementById('femaleCategory');
    let childrenCategory = document.getElementById('childrenCategory');

    maleCategory.appendChild(createCategory('men'));

    femaleCategory.appendChild(createCategory('women'));

    childrenCategory.appendChild(createCategory('children'));
}

//Создать категорию
function createCategory(category) {
    div = document.createElement('div');
    div.className = 'tovaru';
    div.innerHTML = filterProductsByCategory(category);
    return div
}

//Фильтровать продукты по категориям
function filterProductsByCategory(category) {
    let arr = getProductDataFromLocalStorage().filter((item) => item.category == category);

    let innerHtml = '';

    arr.forEach((item) =>
        innerHtml +=
        `<div class="tovar">

            <div>
                <p class="cart" data-id="${item.id}">ADD TO CART</p>
            </div>

            <div class="${item.image}"></div>

            <div><span>${item.title}</span> <span>${item.price},00 €</span></div>

       </div>`
    );

    return innerHtml;
}

//Установить данные по продуктам в локальное хранилище
function setProductDataToLocalStorage() {
    localStorage.setItem(keyProducts, JSON.stringify(products));
}

//Установить данные по корзине в локальное хранилище
function setCartDataToLocalStorage(arr) {
    localStorage.setItem(keyCart, JSON.stringify(arr));
}

//Получить данные по товарам
function getProductDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem(keyProducts));
}

//Получить данные по корзине
function getCartDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem(keyCart));
}

//Обработчик по клику по панели управления
function onControlPanelClick(e) {

    if (e.target.hasAttribute('data-checkbox')) {
        displayProductsCategories();
    } else if (e.target.hasAttribute('data-ascending')) {
        displayProducts(sortPricesAscending());
    } else if (e.target.hasAttribute('data-descending')) {
        displayProducts(sortPricesDescending());
    } else if (e.target.hasAttribute('data-all-categories')) {
        shop.innerHTML = prevHTML;
        displayAllCategories();
    }
}

//Отобразить продукты категорий
function displayProductsCategories() {
    let men = document.getElementById('men');
    let women = document.getElementById('women');
    let children = document.getElementById('children');

    maleCategory.hidden = !men.checked;
    femaleCategory.hidden = !women.checked;
    childrenCategory.hidden = !children.checked;

    if ((femaleCategory.hidden) && (maleCategory.hidden) && (childrenCategory.hidden)) {
        femaleCategory.hidden = false;
        maleCategory.hidden = false;
        childrenCategory.hidden = false;
    }
}

//Сортировать по возрастанию
function sortPricesAscending() {
    return getProductDataFromLocalStorage().sort(function (a, b) {
        return a.price - b.price;
    })
}

//Сортировать по убыванию
function sortPricesDescending() {
    return getProductDataFromLocalStorage().sort(function (a, b) {
        return b.price - a.price;
    })
}

//Отобразить продукты
function displayProducts(arr) {
    shop.innerHTML = '';

    arr.forEach(item => {
        shop.innerHTML +=
            `<div class="tovar">

            <div>
                <p class="cart" data-id="${item.id}">ADD TO CART</p>
            </div>

            <div class="${item.image}"></div>

            <div><span>${item.title}</span> <span>${item.price},00 €</span></div>

       </div>`
    });
}

//Добавить продукты в корзину
function addProductToCart(e) {
    let toggle = true;

    if (e.target.className == 'cart') {
        let product = getProductDataFromLocalStorage().find((item) => item.id == e.target.dataset.id);
        let arr = getCartDataFromLocalStorage();

        arr.forEach((item) => {
            if (item.id == product.id) {
                item.quantity = ++item.quantity;
                toggle = false;
            }
        });

        if (toggle) arr.push(product);

        setCartDataToLocalStorage(arr);
    }
}

//Отобразить продукты из корзины
function displayProductsFromCart() {
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

    getCartDataFromLocalStorage().forEach((item) => {
        arr.push(item.price * item.quantity);

        innerBodyHtml +=
            `<tr data-id='${item.id}'>
             <td class="product-image"><span class="${item.image}"></span></td>
             <td>${item.title}</td>
             <td>${item.quantity}</td>
             <td>${item.price * item.quantity},00 €</td>
             <td class="td-delete"><span data-delete class="delete"></span></td>
            </tr>`
    }
    )

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

//Показать всплывающее окно
function displayPopup(e) {

    if (e.target.className == 'cart') {

        let div = document.createElement('div');
        div.className = 'popup';
        div.innerHTML = `<div>
    <p>Товар добавлен в корзину</p>
    <span id="closePopup"></span>
    </div>
    `;
        document.body.appendChild(div);

        let closeButton = document.getElementById('closePopup');
        closeButton.onclick = function () {
            div.remove();
        }
    }
}

//Удалить товар из корзины
function removeProductFromCart(e) {
    if (e.target.hasAttribute('data-delete')) {
        let arr = getCartDataFromLocalStorage();
        let id = e.target.closest('tr').dataset.id;
        let productToBeRemoved = arr.find((item) => item.id == id);
        let index = arr.indexOf(productToBeRemoved);
        arr.splice(index, 1);
    
        setCartDataToLocalStorage(arr);
        displayProductsFromCart();
    }
}

init();