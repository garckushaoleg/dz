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
    let massive = numbers.split('');
    let resultYes = 0;
    for (let i = 0; i < massive.length; i++) {
        if (+massive[i] % 2 == 0) {
            resultYes += 1;
        }
    }

    return (resultYes) ? resultYes : 0;
}

//Функция нахождения большего из двух рандомных чисел
function getRandomNumber(minNumber, maxNumber) {
    let numberOne = Math.random() * (maxNumber - minNumber) + minNumber;
    console.log(numberOne);
    let numberTwo = Math.random() * (maxNumber - minNumber) + minNumber;
    console.log(numberTwo);

    return (numberOne > numberTwo) ? numberOne : numberTwo;
}


//Количество чётных чисел
let number = prompt('Введите число', '');
let correctResult = validate(number);
alert(getEvenNumbers(correctResult));

//Большее из рандомных чисел
let RandomNumber = getRandomNumber(1000, 2000);
alert(Math.trunc(RandomNumber));