export default class CategoriesView {
    constructor() {
        this.shop = document.getElementById('shop');

        this.displayAllCategories();

        this.controls = document.getElementById('controls');
        this.onControlPanelClick = this.onControlPanelClick.bind(this);
        this.controls.addEventListener('click', this.onControlPanelClick);
    }


    //Отобразить все категории
    displayAllCategories() {
        this.shop.innerHTML = `<div class="soder" id="maleCategory">

        <div class="liniya"><span class="shrift2">MEN</span>
            <p></p>
        </div>
        <div class="stran">
            <p>1 / 5</p>
        </div>
        <div class="stran"><span><img src="src/img/icons/left-chevron.svg"></span><span><img
                    src="src/img/icons/right-chevron.svg"></span></div>
       
    </div>

    <div class="soder" id="femaleCategory">

        <div class="liniya2">
            <p></p><span class="shrift2">WOMEN</span>
        </div>
        <div class="stran2">
            <p>1 / 5</p>
        </div>
        <div class="stran2"><span><img src="src/img/icons/left-chevron.svg"></span><span><img
                    src="src/img/icons/right-chevron.svg"></span></div>

    </div>

    <div class="soder" id="childrenCategory">

        <div class="liniya"><span class="shrift2">CHILDREN</span>
            <p></p>
        </div>
        <div class="stran">
            <p>1 / 5</p>
        </div>
        <div class="stran"><span><img src="src/img/icons/left-chevron.svg"></span><span><img
                    src="src/img/icons/right-chevron.svg"></span></div>

    </div>`;
    }

    //Отобразить все продукты
    displayAllProducts(data) {
        let maleCategory = document.getElementById('maleCategory');
        let femaleCategory = document.getElementById('femaleCategory');
        let childrenCategory = document.getElementById('childrenCategory');

        let div = this.createCategory();

        data.forEach(item => {
            div.innerHTML += this.addProductToCategory(item);
        });

        switch (data[0].category) {
            case 'men':
                maleCategory.appendChild(div);
                break;
            case 'women':
                femaleCategory.appendChild(div);
                break;
            case 'children':
                childrenCategory.appendChild(div);
                break;
        }
    }

    //Создать категорию
    createCategory() {
        let div = document.createElement('div');
        div.className = 'tovaru';
        return div
    }

    //Добавить продукт в категорию
    addProductToCategory(item) {
        return `<div class="tovar">

        <div>
            <p class="cart" data-id="${item.id}">ADD TO CART</p>
        </div>

        <div class="${item.image}"></div>

        <div><span>${item.title}</span> <span>${item.price},00 €</span></div>

   </div>`
    }

    //Обработчик на клик по панели управления
    onControlPanelClick(e) {

        switch (e.target.id) {
            case 'men':
            case 'women':
            case 'children': this.filterProductsByCategory();
                break;
            case 'ascending': this.onClickOnSortButton('ascending');
                break;
            case 'descending': this.onClickOnSortButton('descending');
                break;
            case 'allCategories': this.shop.innerHTML = this.innerHTML;
        }
    }

    //Фильтрация продуктов по категориям
    filterProductsByCategory() {
        let men = document.getElementById('men');
        let women = document.getElementById('women');
        let children = document.getElementById('children');

        let maleCategory = document.getElementById('maleCategory');
        let femaleCategory = document.getElementById('femaleCategory');
        let childrenCategory = document.getElementById('childrenCategory');

        if (maleCategory && femaleCategory && childrenCategory) {

            maleCategory.hidden = !men.checked;
            femaleCategory.hidden = !women.checked;
            childrenCategory.hidden = !children.checked;

            if (!men.checked && !women.checked && !children.checked) {
                maleCategory.hidden = false;
                femaleCategory.hidden = false;
                childrenCategory.hidden = false;
            }
        }
    }

    //Копировать весь внутренний html
    copyEntireInternalHTML() {
        this.innerHTML = this.shop.innerHTML;
    }

    //Отобразить продукты после сортировки
    displayProductsAfterSorting(data) {
        this.shop.innerHTML = '';
        data.forEach(item => {
            this.shop.innerHTML += this.addProductToCategory(item);
        });
    }
}