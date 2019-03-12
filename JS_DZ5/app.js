//Задание массива
const ARRACTION = ["+", "-", "/", "*"];

//Проверка операнда
function testOperand(numb) {
    let numberCalc = prompt('Введите ' + numb + ' числовой операнд!', '');

    if (!Number(numberCalc) && numberCalc != '0') {
        return testOperand(numb);
    } else
        return +numberCalc;
}

//Проверка знака
function testAction() {
    let actionValue = prompt('Введите правильный знак действия: или +, или - , или /, или *', '');

    for (let i = 0; i < ARRACTION.length; i++) {
        if (actionValue == ARRACTION[i]) {
            return ARRACTION[i];
        }
    }

    
    return testAction();
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
let operandOne = testOperand('первый');
let action = testAction();
let operandTwo = testOperand('второй');

//Вывод результата
alert('Результат = ' + result(operandOne, action, operandTwo));