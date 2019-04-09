function Hamburger(dishName, stuffing) {
    this.dishName = dishName;
    this.stuffing = stuffing;
    this.caloriesAddHamburger = 0;
    this.priceHamburgerAdd = 0;
}

Hamburger.prototype.addTopping = function (additive) {
    this.additive = additive;
}

Hamburger.prototype.calculateCalories = function () {
    this.caloriesAddHamburger += this.additive.calories;
    return this.caloriesAddHamburger + this.dishName.calories + this.stuffing.calories
}

Hamburger.prototype.calculatePrice = function () {
    this.priceHamburgerAdd += this.additive.price;
    return this.priceHamburgerAdd + this.dishName.price + this.stuffing.price
}

Hamburger.SIZE_SMALL = {
    price: 50,
    calories: 20
}

Hamburger.SIZE_BIG = {
    price: 100,
    calories: 40
}

Hamburger.STUFFING_CHEESE = {
    price: 10,
    calories: 20
}

Hamburger.STUFFING_SALAD = {
    price: 20,
    calories: 5
}

Hamburger.STUFFING_POTATOES = {
    price: 15,
    calories: 10
}

Hamburger.ADDITIVE_SEASONING = {
    price: 20,
    calories: 5
}

Hamburger.ADDITIVE_MAYO = {
    price: 20,
    calories: 5
}

// маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза
hamburger.addTopping(Hamburger.ADDITIVE_MAYO);
// спросим сколько там калорий
console.log('Calories:' + hamburger.calculateCalories());
// сколько стоит
console.log('Price:' + hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.ADDITIVE_SEASONING);
// А сколько теперь стоит?
console.log('Price with sauce:' + hamburger.calculatePrice());
console.log(hamburger);