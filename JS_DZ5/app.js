//Задание массива
const ARRACTION = ["+", "-", "/", "*"];

//Проверка операнда
function checkOperand(numberCalc) {
    if (!Number(numberCalc)) {
        numberCalc = prompt('Введите числовой операнд!', '');
        return checkOperand(numberCalc);
    } else
        return +numberCalc;
}

//Проверка знака
function checkAction(action) {
    
    for (let i = 0; i < ARRACTION.length; i++) {
        if (action == ARRACTION[i]) {
            return ARRACTION[i];
        }
    }

    action = prompt('Введите правильный знак действия: или +, или - , или /, или *', '');
    return checkAction(action);
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
let value = 0;
let operandOne = checkOperand(value);
let action = checkAction(value);
let operandTwo = checkOperand(value);

//Вывод результата
alert('Результат = ' + result(operandOne, action, operandTwo));