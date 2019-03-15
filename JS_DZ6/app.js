//Вывод модального окна
function modalWindow(value) {
    if (!value) return prompt('Введите число', '');
    else return prompt('Введите число ещё раз', '');
}

//Валидация
function validate(numberTest) {
    if (!Number(numberTest) && numberTest !== '0') {
        numberTest = modalWindow(1);
        return validate(numberTest);
    } else return numberTest;
}


/*Функция вывода количества чётных чисел в числе. Передаём в функцию строку, делаем из неё массив
и при помощи цикла находим нулевой остаток от деления для каждого элемента массива.*/
function getEvenNumbers(numbers) {
    let numeralAll = numbers.split('');
    let result = 0;
    for (let i = 0; i < numeralAll.length; i++) {
        if (!(+numeralAll[i] % 2)) {
            result ++;
        }
    }

    return result;
}

function calculateNumber(NumberOne, NumberTwo) {
    let calculateResult = Math.random() * (NumberTwo - NumberOne) + NumberOne;
    return calculateResult;
}

//Функция нахождения большего из двух рандомных чисел
function getLagerNumber(minNumber, maxNumber) {
    let numberRandomOne = calculateNumber(minNumber, maxNumber);
    let numberRandomTwo = calculateNumber(minNumber, maxNumber);
    return (numberRandomOne > numberRandomTwo) ? numberRandomOne : numberRandomTwo;
}


//Количество чётных чисел
let number = modalWindow(0);
let correctResult = validate(number);
let evenNumbers = getEvenNumbers(correctResult);
alert(evenNumbers);

//Большее из рандомных чисел
let randomNumber = getLagerNumber(1000, 2000);
randomNumber = Math.trunc(randomNumber);
alert(randomNumber);