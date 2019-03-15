//Валидация
function validate(numberTest) {
    if (!Number(numberTest) && numberTest !== '0') {
        numberTest = prompt('Введите число ещё раз');
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

function calculateRandomNumber(NumberOne, NumberTwo) {
    let calculateResult = Math.random() * (NumberTwo - NumberOne) + NumberOne;
    return calculateResult;
}

//Функция нахождения большего из двух рандомных чисел
function getRandomNumber(minNumber, maxNumber) {
    let numberRandomOne = calculateRandomNumber(minNumber, maxNumber);
    let numberRandomTwo = calculateRandomNumber(minNumber, maxNumber);
    return (numberRandomOne > numberRandomTwo) ? numberRandomOne : numberRandomTwo;
}


//Количество чётных чисел
let number = prompt('Введите число', '');
let correctResult = validate(number);
EvenNumbers = getEvenNumbers(correctResult);
alert(EvenNumbers);

//Большее из рандомных чисел
let randomNumber = getRandomNumber(1000, 2000);
randomNumber = Math.trunc(randomNumber);
alert(randomNumber);