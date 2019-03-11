//Задание массива
const ARRACTION = ["+", "-", "/", "*"];

//Проверка операнда
function checkOperand(numb, numberCalc) {

    if (!Number(numberCalc)) {
        numberCalc = prompt('Введите ' + numb +' числовой операнд!', '');
        return checkOperand(numb, numberCalc);
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
let operandOne = checkOperand('первый');
let action = checkAction();
let operandTwo = checkOperand('второй');

//Вывод результата
alert('Результат = ' + result(operandOne, action, operandTwo));