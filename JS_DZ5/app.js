//Задание массива
const ARRACTION = ["+", "-", "/", "*"];

//Проверка операнда
function getOperand(numb) {
    let numberCalc = prompt('Введите ' + numb + ' числовой операнд!', '');

    if (!Number(numberCalc) && numberCalc != '0') {
        return getOperand(numb);
    } else
        return +numberCalc;
}

//Проверка знака
function getAction() {
    let actionValue = prompt('Введите правильный знак действия: или +, или - , или /, или *', '');

    for (let i = 0; i < ARRACTION.length; i++) {
        if (actionValue == ARRACTION[i]) {
            return ARRACTION[i];
        }
    }

    
    return getAction();
}

//Вычисления
function result(oneOperand, actionFunc, twoOperand) {
    switch (actionFunc) {
        case '+': return oneOperand + twoOperand;
        case '-': return oneOperand - twoOperand;
        case '/': return oneOperand / twoOperand;
        case '*': return oneOperand * twoOperand;
    }
}

//Главный код
let operandOne = getOperand('первый');
let action = getAction();
let operandTwo = getOperand('второй');

//Вывод результата
alert('Результат = ' + result(operandOne, action, operandTwo));